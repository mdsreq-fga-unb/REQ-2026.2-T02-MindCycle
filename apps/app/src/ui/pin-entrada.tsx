import type { Pin, TipoPin } from '@mindcycle/shared';

import { PinNumerico } from './pin-numerico';
import { PinPetalas } from './pin-petalas';

/** A flor ou o teclado, conforme o tipo de PIN da conta. */
export function PinEntrada({
  tipo,
  aoCompletar,
  desabilitado,
}: {
  tipo: TipoPin;
  aoCompletar: (pin: Pin) => void;
  desabilitado?: boolean;
}) {
  const Componente = tipo === 'numerico' ? PinNumerico : PinPetalas;
  return <Componente aoCompletar={aoCompletar} desabilitado={desabilitado} />;
}
