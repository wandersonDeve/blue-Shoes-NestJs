-- AlterTable
ALTER TABLE `carrinho` ADD COLUMN `usuarioId` INTEGER NULL,
    MODIFY `quantidade` INTEGER NULL,
    MODIFY `valor_total` DOUBLE NULL;

-- AddForeignKey
ALTER TABLE `Carrinho` ADD CONSTRAINT `Carrinho_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
