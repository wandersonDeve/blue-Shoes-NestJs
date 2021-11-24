/*
  Warnings:

  - You are about to drop the column `logo` on the `Produto` table. All the data in the column will be lost.
  - You are about to drop the column `marca` on the `Produto` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[marcaId]` on the table `Produto` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `marcaId` to the `Produto` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Marca" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "logo" TEXT,
    "logo_parceiro" TEXT,

    CONSTRAINT "Marca_pkey" PRIMARY KEY ("id")
);

-- AlterTable
ALTER TABLE "Produto" DROP COLUMN "logo",
DROP COLUMN "marca",
ADD COLUMN     "marcaId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Produto_marcaId_key" ON "Produto"("marcaId");

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_marcaId_fkey" FOREIGN KEY ("marcaId") REFERENCES "Marca"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
