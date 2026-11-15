-- CreateTable
CREATE TABLE "tarefas" (
    "id" UUID NOT NULL,
    "usuaria_id" UUID NOT NULL,
    "titulo" TEXT NOT NULL,
    "prazo" DATE NOT NULL,
    "prioridade" INTEGER NOT NULL,
    "energia" INTEGER NOT NULL,
    "duracao_minutos" INTEGER,
    "data_planejada" DATE NOT NULL,
    "criada_em" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "concluida_em" TIMESTAMPTZ,

    CONSTRAINT "tarefas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "tarefas_usuaria_id_data_planejada_idx" ON "tarefas"("usuaria_id", "data_planejada");

-- AddForeignKey
ALTER TABLE "tarefas" ADD CONSTRAINT "tarefas_usuaria_id_fkey" FOREIGN KEY ("usuaria_id") REFERENCES "usuarias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

