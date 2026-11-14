import type { UsuariaAutenticada } from '../account/usuaria.js';

// Tipa @CurrentUser() e AuthenticationContext com a usuária da aplicação.
declare module '@nestjs/authentication' {
  interface AuthenticationTypes {
    user: UsuariaAutenticada;
  }
}
