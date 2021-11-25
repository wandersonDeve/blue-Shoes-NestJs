/*
  Warnings:

  - You are about to drop the column `recoverPasswordToken` on the `Usuario` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "recoverPasswordToken",
ADD COLUMN     "recoveryPasswordToken" TEXT;
