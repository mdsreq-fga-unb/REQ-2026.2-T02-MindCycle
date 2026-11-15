-- CreateTable
CREATE TABLE "recuperacoes_acesso" (
    "id" UUID NOT NULL,
    "usuaria_id" UUID NOT NULL,
    "codigo_hash" TEXT NOT NULL,
    "criado_em" TIMESTAMPTZ NOT NULL,
    "expira_em" TIMESTAMPTZ NOT NULL,
    "tentativas" INTEGER NOT NULL DEFAULT 0,
    "usado_em" TIMESTAMPTZ,

    CONSTRAINT "recuperacoes_acesso_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "recuperacoes_acesso_usuaria_id_idx" ON "recuperacoes_acesso"("usuaria_id");

-- AddForeignKey
ALTER TABLE "recuperacoes_acesso" ADD CONSTRAINT "recuperacoes_acesso_usuaria_id_fkey" FOREIGN KEY ("usuaria_id") REFERENCES "usuarias"("id") ON DELETE CASCADE ON UPDATE CASCADE;
