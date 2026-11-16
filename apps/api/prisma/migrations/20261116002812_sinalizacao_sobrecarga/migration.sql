-- CreateTable
CREATE TABLE "sinalizacoes_sobrecarga" (
    "id" UUID NOT NULL,
    "usuaria_id" UUID NOT NULL,
    "data_local" DATE NOT NULL,
    "criado_em" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sinalizacoes_sobrecarga_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "sinalizacoes_sobrecarga_usuaria_id_data_local_criado_em_idx" ON "sinalizacoes_sobrecarga"("usuaria_id", "data_local", "criado_em");

-- AddForeignKey
ALTER TABLE "sinalizacoes_sobrecarga" ADD CONSTRAINT "sinalizacoes_sobrecarga_usuaria_id_fkey" FOREIGN KEY ("usuaria_id") REFERENCES "usuarias"("id") ON DELETE CASCADE ON UPDATE CASCADE;
