/*
  Warnings:

  - You are about to drop the column `quantidade` on the `Carrinho` table. All the data in the column will be lost.
  - You are about to drop the column `quantidade_itens` on the `Carrinho` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Carrinho" DROP COLUMN "quantidade",
DROP COLUMN "quantidade_itens";
