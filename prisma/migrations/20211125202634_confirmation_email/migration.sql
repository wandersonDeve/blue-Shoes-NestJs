/*
  Warnings:

  - You are about to drop the column `logo` on the `Produto` table. All the data in the column will be lost.
  - You are about to drop the column `marca` on the `Produto` table. All the data in the column will be lost.
  - The `tamanho` column on the `Produto` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Produto" DROP COLUMN "logo",
DROP COLUMN "marca",
ADD COLUMN     "marcaId" INTEGER,
DROP COLUMN "tamanho",
ADD COLUMN     "tamanho" INTEGER[];

-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "confirmationToken" TEXT,
ADD COLUMN     "recoveryPasswordToken" TEXT;

-- CreateTable
CREATE TABLE "Marca" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "logo" TEXT,
    "logo_parceiro" TEXT,

    CONSTRAINT "Marca_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_marcaId_fkey" FOREIGN KEY ("marcaId") REFERENCES "Marca"("id") ON DELETE SET NULL ON UPDATE CASCADE;
