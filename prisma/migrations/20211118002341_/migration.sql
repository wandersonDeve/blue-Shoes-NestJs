/*
  Warnings:

  - You are about to drop the `Storage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Storage" DROP CONSTRAINT "Storage_produtoId_fkey";

-- AlterTable
ALTER TABLE "Carrinho" ADD COLUMN     "cor" TEXT,
ADD COLUMN     "quantidade" INTEGER,
ADD COLUMN     "tamanho" INTEGER;

-- DropTable
DROP TABLE "Storage";
