-- CreateEnum
CREATE TYPE "origem_movimentacao_tarefa" AS ENUM ('usuaria', 'reajuste');

-- CreateTable
CREATE TABLE "movimentacoes_tarefa" (
    "id" UUID NOT NULL,
    "tarefa_id" UUID NOT NULL,
    "data_anterior" DATE NOT NULL,
    "data_nova" DATE NOT NULL,
    "origem" "origem_movimentacao_tarefa" NOT NULL,
    "criada_em" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "movimentacoes_tarefa_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "movimentacoes_tarefa_tarefa_id_criada_em_idx" ON "movimentacoes_tarefa"("tarefa_id", "criada_em");

-- AddForeignKey
ALTER TABLE "movimentacoes_tarefa" ADD CONSTRAINT "movimentacoes_tarefa_tarefa_id_fkey" FOREIGN KEY ("tarefa_id") REFERENCES "tarefas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
