-- DropForeignKey
ALTER TABLE "Item_do_carrinho" DROP CONSTRAINT "Item_do_carrinho_carrinhoId_fkey";

-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "confirmationToken" TEXT,
ADD COLUMN     "recoverToken" TEXT;

-- AddForeignKey
ALTER TABLE "Item_do_carrinho" ADD CONSTRAINT "Item_do_carrinho_carrinhoId_fkey" FOREIGN KEY ("carrinhoId") REFERENCES "Carrinho"("id") ON DELETE SET NULL ON UPDATE CASCADE;
