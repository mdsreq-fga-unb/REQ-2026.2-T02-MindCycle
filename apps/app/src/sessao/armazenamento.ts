import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

// No celular, os tokens ficam no SecureStore (Keychain/Keystore); na web, no localStorage.

export async function lerItem(chave: string): Promise<string | null> {
  if (Platform.OS === 'web') {
    try {
      return localStorage.getItem(chave);
    } catch {
      return null;
    }
  }
  return SecureStore.getItemAsync(chave);
}

export async function gravarItem(chave: string, valor: string | null): Promise<void> {
  if (Platform.OS === 'web') {
    try {
      if (valor === null) {
        localStorage.removeItem(chave);
      } else {
        localStorage.setItem(chave, valor);
      }
    } catch {
      // Sem localStorage (navegação privada restrita): a sessão vale só enquanto a aba estiver aberta.
    }
    return;
  }
  if (valor === null) {
    await SecureStore.deleteItemAsync(chave);
  } else {
    await SecureStore.setItemAsync(chave, valor);
  }
}
