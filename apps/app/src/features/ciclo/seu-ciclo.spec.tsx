import { describe, expect, it, jest } from '@jest/globals';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react-native';
import type { Ciclo } from '@mindcycle/shared';

import { textos } from '@/textos';

import { SeuCiclo } from './seu-ciclo';

// O check-in de hoje vem de outra consulta; aqui ele é a fronteira do teste.
const mockCheckinsDoDia = jest.fn();
jest.mock('@/features/checkin/consulta', () => ({ useCheckinsDoDia: () => mockCheckinsDoDia() }));
jest.mock('@/api/endpoints', () => ({ api: {} }));

const t = textos.ciclo.conteudos;
const HOJE = '2026-11-16';
const lutea: Ciclo = {
  inicios: [{ id: 'a', data: '2026-10-27' }],
  perfil: { duracaoMedia: 28, irregular: false },
  situacao: { estimada: true, diaDoCiclo: 21, fase: 'lutea', duracao: 28 },
};

async function abrir() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { gcTime: Infinity } } });
  await render(
    <QueryClientProvider client={queryClient}>
      <SeuCiclo ciclo={lutea} hoje={HOJE} />
    </QueryClientProvider>,
  );
}

describe('SeuCiclo e os conteúdos recomendados (HU09)', () => {
  // Revisão do PR #120, ponto 1: os sintomas do check-in vigente chegam à recomendação.
  it('põe primeiro o conteúdo do sintoma registrado hoje', async () => {
    mockCheckinsDoDia.mockReturnValue({
      isPending: false,
      data: { vigente: { sintomas: [{ sintoma: 'colica', intensidade: 2 }] }, registros: [] },
    });
    await abrir();

    expect(screen.getAllByRole('link')[0]).toHaveAccessibleName(t.porConteudo.alivio_colica.titulo);
  });

  // Ponto 2: sem esperar, a lista mostraria só a fase e se reorganizaria depois.
  it('não mostra os conteúdos enquanto o check-in de hoje carrega', async () => {
    mockCheckinsDoDia.mockReturnValue({ isPending: true, data: undefined });
    await abrir();

    expect(screen.queryByText(t.titulo)).toBeNull();
  });
});
