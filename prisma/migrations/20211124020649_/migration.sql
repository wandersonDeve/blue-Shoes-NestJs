/*
  Warnings:

  - You are about to drop the column `logo` on the `Produto` table. All the data in the column will be lost.
  - You are about to drop the column `marca` on the `Produto` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[marcaId]` on the table `Produto` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Produto" DROP COLUMN "logo",
DROP COLUMN "marca",
ADD COLUMN     "marcaId" INTEGER;

-- CreateTable
CREATE TABLE "Marca" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "logo" TEXT,
    "logo_parceiro" TEXT,

    CONSTRAINT "Marca_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Produto_marcaId_key" ON "Produto"("marcaId");

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_marcaId_fkey" FOREIGN KEY ("marcaId") REFERENCES "Marca"("id") ON DELETE SET NULL ON UPDATE CASCADE;
