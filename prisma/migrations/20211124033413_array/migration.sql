/*
  Warnings:

  - The `tamanho` column on the `Produto` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Produto" DROP COLUMN "tamanho",
ADD COLUMN     "tamanho" INTEGER[];
