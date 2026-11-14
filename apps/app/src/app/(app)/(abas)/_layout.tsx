import type { SymbolViewProps } from 'expo-symbols';
import { SymbolView } from 'expo-symbols';
import { Tabs } from 'expo-router/js-tabs';

import { textos } from '@/textos';
import { cores } from '@/ui/tema';

type Icone = Extract<SymbolViewProps['name'], object>;

// Abas da área protegida. Telas que se abrem por cima das abas (detalhe de
// tarefa, registro do dia) entram como rotas irmãs de (abas), na pilha de (app).
// Plum e inkSoft sobre branco passam no WCAG 2.1 AA (RNF11).
export default function AbasLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: cores.ground },
        tabBarActiveTintColor: cores.plum,
        tabBarInactiveTintColor: cores.inkSoft,
        tabBarStyle: { backgroundColor: cores.white, borderTopColor: cores.blush },
        tabBarLabelStyle: { fontWeight: '600' },
      }}>
      {aba('index', textos.abas.hoje, { ios: 'sun.max', android: 'today' })}
      {aba('ciclo', textos.abas.ciclo, { ios: 'drop', android: 'water_drop' })}
      {aba('tarefas', textos.abas.tarefas, { ios: 'checklist', android: 'checklist' })}
      {aba('acolhimento', textos.abas.acolhimento, { ios: 'leaf', android: 'spa' })}
      {aba('conta', textos.abas.conta, { ios: 'person.crop.circle', android: 'account_circle' })}
    </Tabs>
  );
}

function aba(nome: string, titulo: string, icone: Icone) {
  return (
    <Tabs.Screen
      name={nome}
      options={{
        title: titulo,
        tabBarAccessibilityLabel: titulo,
        tabBarIcon: ({ color, size }) => <SymbolView name={icone} tintColor={color} size={size} />,
      }}
    />
  );
}
