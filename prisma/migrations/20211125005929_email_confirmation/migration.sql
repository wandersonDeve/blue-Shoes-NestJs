-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN IF NOT EXISTS "confirmationToken" TEXT,
ADD COLUMN IF NOT EXISTS "recoverPasswordToken" TEXT;
