/*
  Warnings:

  - You are about to drop the column `Boleto` on the `pedido` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[usuarioId]` on the table `Carrinho` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `boleto` to the `Pedido` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pedido` DROP COLUMN `Boleto`,
    ADD COLUMN `boleto` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Carrinho_usuarioId_key` ON `Carrinho`(`usuarioId`);
