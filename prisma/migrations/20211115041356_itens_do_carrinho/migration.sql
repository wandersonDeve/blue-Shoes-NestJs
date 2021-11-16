/*
  Warnings:

  - You are about to drop the column `quantidade` on the `carrinho` table. All the data in the column will be lost.
  - You are about to drop the `_carrinhotoproduto` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_carrinhotoproduto` DROP FOREIGN KEY `_carrinhotoproduto_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_carrinhotoproduto` DROP FOREIGN KEY `_carrinhotoproduto_ibfk_2`;

-- AlterTable
ALTER TABLE `carrinho` DROP COLUMN `quantidade`,
    ADD COLUMN `quantidade_itens` INTEGER NULL;

-- DropTable
DROP TABLE `_carrinhotoproduto`;

-- CreateTable
CREATE TABLE `Item_do_carrinho` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `carrinhoId` INTEGER NULL,
    `produtoId` INTEGER NULL,
    `quantidade` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Item_do_carrinho` ADD CONSTRAINT `Item_do_carrinho_carrinhoId_fkey` FOREIGN KEY (`carrinhoId`) REFERENCES `Carrinho`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Item_do_carrinho` ADD CONSTRAINT `Item_do_carrinho_produtoId_fkey` FOREIGN KEY (`produtoId`) REFERENCES `Produto`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
