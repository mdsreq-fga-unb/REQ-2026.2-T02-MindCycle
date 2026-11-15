-- CreateEnum
CREATE TYPE "tipo_pin" AS ENUM ('numerico', 'petalas');

-- AlterTable
ALTER TABLE "usuarias" ADD COLUMN     "pin_bloqueado_ate" TIMESTAMPTZ,
ADD COLUMN     "pin_hash" TEXT,
ADD COLUMN     "pin_tentativas" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "pin_tipo" "tipo_pin";
