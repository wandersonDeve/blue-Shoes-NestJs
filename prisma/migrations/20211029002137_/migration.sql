/*
  Warnings:

  - You are about to drop the column `displayName` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cpf]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `color` to the `Produto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descricao` to the `Produto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantidade` to the `Produto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `Produto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cep` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cpf` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `User_displayName_key` ON `user`;

-- AlterTable
ALTER TABLE `produto` ADD COLUMN `color` VARCHAR(191) NOT NULL,
    ADD COLUMN `descricao` VARCHAR(191) NOT NULL,
    ADD COLUMN `quantidade` INTEGER NOT NULL,
    ADD COLUMN `size` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `displayName`,
    ADD COLUMN `cep` VARCHAR(191) NOT NULL,
    ADD COLUMN `cpf` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_cpf_key` ON `User`(`cpf`);
