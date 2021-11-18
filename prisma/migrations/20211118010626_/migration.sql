/*
  Warnings:

  - You are about to drop the column `cor` on the `Carrinho` table. All the data in the column will be lost.
  - You are about to drop the column `tamanho` on the `Carrinho` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Carrinho" DROP COLUMN "cor",
DROP COLUMN "tamanho";

-- AlterTable
ALTER TABLE "Produto" ADD COLUMN     "cor" TEXT NOT NULL DEFAULT E'Branco',
ADD COLUMN     "tamanho" INTEGER NOT NULL DEFAULT 40;
