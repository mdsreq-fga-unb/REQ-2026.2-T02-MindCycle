import { validarAmbiente } from './common/ambiente.js';

// Roda na imagem antes das migrations (Dockerfile), para que uma variável errada
// pare o contêiner antes de qualquer acesso ao banco.
try {
  validarAmbiente(process.env);
} catch (erro) {
  console.error((erro as Error).message);
  process.exit(1);
}
