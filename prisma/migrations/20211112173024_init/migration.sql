/*
  Warnings:

  - You are about to drop the column `carrinhoId` on the `produto` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `produto` DROP FOREIGN KEY `Produto_carrinhoId_fkey`;

-- AlterTable
ALTER TABLE `produto` DROP COLUMN `carrinhoId`;

-- CreateTable
CREATE TABLE `_CarrinhoToProduto` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CarrinhoToProduto_AB_unique`(`A`, `B`),
    INDEX `_CarrinhoToProduto_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_CarrinhoToProduto` ADD FOREIGN KEY (`A`) REFERENCES `Carrinho`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CarrinhoToProduto` ADD FOREIGN KEY (`B`) REFERENCES `Produto`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
