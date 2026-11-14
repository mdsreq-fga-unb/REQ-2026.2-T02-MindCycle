/** A usuária como o resto da API a vê: sem o hash da senha. */
export interface UsuariaAutenticada {
  id: string;
  email: string;
  fuso: string;
}
