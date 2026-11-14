-- CreateTable
CREATE TABLE "usuarias" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "senha_hash" TEXT NOT NULL,
    "fuso" TEXT NOT NULL,
    "criada_em" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuarias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "consentimentos" (
    "id" UUID NOT NULL,
    "usuaria_id" UUID NOT NULL,
    "versao_termos" TEXT NOT NULL,
    "aceito_em" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "revogado_em" TIMESTAMPTZ,

    CONSTRAINT "consentimentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "refresh_tokens" (
    "id" TEXT NOT NULL,
    "family_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL,
    "expires_at" TIMESTAMPTZ NOT NULL,
    "family_expires_at" TIMESTAMPTZ NOT NULL,
    "used_at" TIMESTAMPTZ,
    "revoked" BOOLEAN NOT NULL DEFAULT false,
    "claims" JSONB,

    CONSTRAINT "refresh_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarias_email_key" ON "usuarias"("email");

-- CreateIndex
CREATE INDEX "consentimentos_usuaria_id_idx" ON "consentimentos"("usuaria_id");

-- CreateIndex
CREATE INDEX "refresh_tokens_family_id_idx" ON "refresh_tokens"("family_id");

-- CreateIndex
CREATE INDEX "refresh_tokens_user_id_idx" ON "refresh_tokens"("user_id");

-- CreateIndex
CREATE INDEX "refresh_tokens_family_expires_at_idx" ON "refresh_tokens"("family_expires_at");

-- AddForeignKey
ALTER TABLE "consentimentos" ADD CONSTRAINT "consentimentos_usuaria_id_fkey" FOREIGN KEY ("usuaria_id") REFERENCES "usuarias"("id") ON DELETE CASCADE ON UPDATE CASCADE;
