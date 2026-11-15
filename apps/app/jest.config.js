// O app roda no React Native, então os testes de componente usam jest-expo: o
// preset dele carrega o ambiente do Expo e transforma os pacotes RN, que vêm em
// ESM. A API e o shared seguem no vitest — aqui não dá, porque o runtime é outro.
module.exports = {
  preset: 'jest-expo',
  // Mesmo "@/" do tsconfig, para o teste importar como o app importa.
  moduleNameMapper: {
    '^@/assets/(.*)$': '<rootDir>/assets/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: ['**/*.spec.ts', '**/*.spec.tsx'],
};
