-- CreateEnum
CREATE TYPE "origem_checkin" AS ENUM ('registro', 'sobrecarga');

-- CreateTable
CREATE TABLE "checkins" (
    "id" UUID NOT NULL,
    "usuaria_id" UUID NOT NULL,
    "data_local" DATE NOT NULL,
    "criado_em" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMPTZ NOT NULL,
    "disposicao" INTEGER NOT NULL,
    "sem_sintomas" BOOLEAN NOT NULL,
    "origem" "origem_checkin" NOT NULL DEFAULT 'registro',

    CONSTRAINT "checkins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "checkin_sintomas" (
    "id" UUID NOT NULL,
    "checkin_id" UUID NOT NULL,
    "sintoma" TEXT NOT NULL,
    "intensidade" INTEGER NOT NULL,

    CONSTRAINT "checkin_sintomas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "checkins_usuaria_id_data_local_criado_em_idx" ON "checkins"("usuaria_id", "data_local", "criado_em");

-- CreateIndex
CREATE UNIQUE INDEX "checkin_sintomas_checkin_id_sintoma_key" ON "checkin_sintomas"("checkin_id", "sintoma");

-- AddForeignKey
ALTER TABLE "checkins" ADD CONSTRAINT "checkins_usuaria_id_fkey" FOREIGN KEY ("usuaria_id") REFERENCES "usuarias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checkin_sintomas" ADD CONSTRAINT "checkin_sintomas_checkin_id_fkey" FOREIGN KEY ("checkin_id") REFERENCES "checkins"("id") ON DELETE CASCADE ON UPDATE CASCADE;

