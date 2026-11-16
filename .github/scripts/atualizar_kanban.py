"""Tira um retrato do quadro kanban (GitHub Project) para o site.

O quadro é privado, então o site não consegue lê-lo direto: este script lê
o quadro com o gh CLI e grava assets/js/kanban.js, que a página Entregas e
cronograma desenha. Rode na raiz do repositório, com o gh autenticado com o
escopo "project" (gh auth refresh -s project):

    python3 .github/scripts/atualizar_kanban.py

O arquivo gerado nunca é editado à mão: para mudar o quadro, mude o Project
no GitHub e rode o script de novo.
"""
import json
import os
import subprocess
import sys
from datetime import datetime, timezone, timedelta

DONO = 'mdsreq-fga-unb'
PROJETO = '120'
SAIDA = 'assets/js/kanban.js'


def uma_linha(texto):
    return ' '.join((texto or '').split())


def motivo_da_api():
    # "gh project" troca o erro da API por "unknown owner type"; a consulta
    # direta mostra o motivo de verdade (token inválido, sem permissão...).
    consulta = 'query{organization(login:"%s"){projectV2(number:%s){title}}}' % (DONO, PROJETO)
    r = subprocess.run(['gh', 'api', 'graphql', '-f', 'query=' + consulta], capture_output=True, text=True)
    return '' if r.returncode == 0 else uma_linha(r.stderr or r.stdout)


def gh(*args):
    r = subprocess.run(['gh', *args, '--format', 'json'], capture_output=True, text=True)
    if r.returncode != 0:
        # Mostra o motivo (token sem permissão, Project inexistente...). No
        # GitHub Actions, o aviso aparece no resumo da execução.
        motivo = uma_linha(r.stderr or r.stdout) or 'sem mensagem'
        api = motivo_da_api()
        if api:
            motivo += ' | API: ' + api
        print('Falhou: gh %s\n%s' % (' '.join(args), motivo), file=sys.stderr)
        if os.environ.get('GITHUB_ACTIONS') == 'true':
            print('::warning title=Quadro kanban não atualizado::gh %s: %s' % (' '.join(args), motivo))
        sys.exit(1)
    return json.loads(r.stdout)


projeto = gh('project', 'view', PROJETO, '--owner', DONO)
campos = gh('project', 'field-list', PROJETO, '--owner', DONO)['fields']
status = next(c for c in campos if c['name'] == 'Status')
itens = gh('project', 'item-list', PROJETO, '--owner', DONO, '--limit', '1000')['items']

colunas = [{'nome': o['name'], 'itens': []} for o in status['options']]
por_nome = {c['nome']: c for c in colunas}
sem_status = {'nome': 'Sem status', 'itens': []}

for i in itens:
    c = i.get('content') or {}
    marco = i.get('milestone') or None
    item = {
        'numero': c.get('number'),
        'titulo': c.get('title') or i.get('title') or '',
        'url': c.get('url') or '',
        'tipo': c.get('type') or 'DraftIssue',
        'responsaveis': i.get('assignees') or [],
        'marco': {'titulo': marco['title'], 'data': (marco.get('dueOn') or '')[:10]} if marco else None,
    }
    por_nome.get(i.get('status'), sem_status)['itens'].append(item)

if sem_status['itens']:
    colunas.append(sem_status)

brasilia = timezone(timedelta(hours=-3))
dados = {
    'atualizadoEm': datetime.now(brasilia).strftime('%Y-%m-%dT%H:%M'),
    'quadro': {'titulo': projeto['title'], 'url': projeto['url']},
    'colunas': colunas,
}

with open(SAIDA, 'w', encoding='utf-8') as f:
    f.write('// ===== Retrato do quadro kanban =====\n')
    f.write('//\n')
    f.write('// GERADO por .github/scripts/atualizar_kanban.py a partir do GitHub Project.\n')
    f.write('// Não edite à mão: mude o quadro no GitHub e rode o script de novo.\n\n')
    f.write('const KANBAN = ')
    json.dump(dados, f, ensure_ascii=False, indent=2)
    f.write(';\n')

total = sum(len(c['itens']) for c in colunas)
print('%s: %d itens em %d colunas (%s)' % (SAIDA, total, len(colunas),
      ', '.join('%s %d' % (c['nome'], len(c['itens'])) for c in colunas)))
