import * as SecureStore from 'expo-secure-store';

// Os tokens ficam no SecureStore, que no Android usa o Keystore para cifrá-los.

export async function lerItem(chave: string): Promise<string | null> {
  return SecureStore.getItemAsync(chave);
}

export async function gravarItem(chave: string, valor: string | null): Promise<void> {
  if (valor === null) {
    await SecureStore.deleteItemAsync(chave);
  } else {
    await SecureStore.setItemAsync(chave, valor);
  }
}
