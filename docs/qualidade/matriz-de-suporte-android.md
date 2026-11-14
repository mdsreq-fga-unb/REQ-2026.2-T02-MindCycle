# Matriz de suporte Android (RNF10)

O RNF10 limita esta entrega ao app Android, sem navegador, computador nem iOS, e
pede ensaio dos fluxos em aparelhos físicos. Esta matriz diz em quais aparelhos e
configurações o MindCycle é verificado; os resultados de cada ensaio ficam no
registro do DoD da história.

## Configuração do app

Valores extraídos do projeto Android que o Expo gera (`npx expo prebuild`), não
presumidos:

| Item | Valor | De onde vem |
|---|---|---|
| Identificador | `br.unb.mindcycle` | `apps/app/app.json`, `expo.android.package` |
| Android mínimo | API 24 (Android 7.0) | `minSdk` do catálogo do React Native (`react-native/gradle/libs.versions.toml`), aplicado pelo Expo |
| Android alvo | API 36 | `targetSdk` do mesmo catálogo |
| Arquiteturas do APK de teste | `arm64-v8a`, `armeabi-v7a` | `.github/workflows/apk.yml` |
| Motor JavaScript | Hermes, nova arquitetura ativa | `android/gradle.properties` gerado |

Ao atualizar o SDK do Expo, gere o projeto de novo e confira esta tabela.

## Aparelhos

A equipe preenche uma linha por aparelho físico usado nos ensaios. Escolham pelo
menos um aparelho de entrada (tela pequena, pouca memória) e um intermediário, e
cubram uma versão antiga e uma recente do Android.

| Aparelho | Android (API) | Resolução | Densidade | Escala de fonte ampliada | Responsável |
|---|---|---|---|---|---|
| _a preencher_ | | | | | |
| _a preencher_ | | | | | |

- **Resolução e densidade:** em Configurações > Sobre o telefone, ou com
  `adb shell wm size` e `adb shell wm density`.
- **Escalas de fonte:** cada fluxo é verificado na escala **normal** (padrão do
  aparelho) e na **ampliada**, a maior opção em Configurações > Tela > Tamanho da
  fonte. Registre na tabela o valor da ampliada (por exemplo, 130%).

## Como instalar o APK de teste

1. No GitHub, abra **Actions > APK de teste** e escolha a execução do commit que
   será ensaiado (a cada push na `main` com mudança no app há uma; também dá para
   rodar manualmente em **Run workflow**).
2. Baixe o artefato `mindcycle-<commit>` e extraia o `app-release.apk`.
3. No aparelho, permita instalar apps desta origem e abra o APK, ou instale pelo
   computador com `adb install app-release.apk`.

O APK é de release, como o protocolo de desempenho exige, mas assinado com a chave
de depuração: serve para teste, não para a loja. Ele procura a API no endereço da
variável `API_URL_TESTE` do repositório (Settings > Secrets and variables >
Actions > Variables), que precisa ser HTTPS, porque o build de release não aceita
HTTP sem TLS.

## Como registrar as evidências do DoD

Para cada fluxo ensaiado, registre no DoD da história:

- fluxo, aparelho, versão do Android, escala de fonte e commit do APK;
- resultado (sem sobreposição, corte ou controle inacessível) e a evidência
  (captura ou vídeo);
- para RNF06, RNF07 e RNF08, as cinco medições por cenário, seguindo o protocolo
  comum de desempenho Android publicado na página de requisitos: build de release,
  aparelho físico, rede registrada, partida fria e aquecida separadas, e nenhuma
  medição acima do limite;
- para o RNF11, o elemento, as cores, o tamanho e a razão de contraste medida.

Emulador e Expo Go servem para desenvolver e diagnosticar, não para aprovar.
