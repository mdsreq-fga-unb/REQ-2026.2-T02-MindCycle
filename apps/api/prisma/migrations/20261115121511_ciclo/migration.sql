-- CreateTable
CREATE TABLE "inicios_menstruacao" (
    "id" UUID NOT NULL,
    "usuaria_id" UUID NOT NULL,
    "data" DATE NOT NULL,
    "criado_em" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "inicios_menstruacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "perfis_ciclo" (
    "usuaria_id" UUID NOT NULL,
    "duracao_media" INTEGER,
    "irregular" BOOLEAN NOT NULL DEFAULT false,
    "atualizado_em" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "perfis_ciclo_pkey" PRIMARY KEY ("usuaria_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "inicios_menstruacao_usuaria_id_data_key" ON "inicios_menstruacao"("usuaria_id", "data");

-- AddForeignKey
ALTER TABLE "inicios_menstruacao" ADD CONSTRAINT "inicios_menstruacao_usuaria_id_fkey" FOREIGN KEY ("usuaria_id") REFERENCES "usuarias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "perfis_ciclo" ADD CONSTRAINT "perfis_ciclo_usuaria_id_fkey" FOREIGN KEY ("usuaria_id") REFERENCES "usuarias"("id") ON DELETE CASCADE ON UPDATE CASCADE;
