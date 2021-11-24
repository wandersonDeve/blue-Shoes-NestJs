-- DropForeignKey
ALTER TABLE "Item_do_carrinho" DROP CONSTRAINT "Item_do_carrinho_carrinhoId_fkey";

-- DropForeignKey
ALTER TABLE "Produto" DROP CONSTRAINT "Produto_categoriasId_fkey";

-- AlterTable
ALTER TABLE "Produto" ALTER COLUMN "cor" DROP DEFAULT,
ALTER COLUMN "tamanho" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Usuario" ALTER COLUMN "role" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_categoriasId_fkey" FOREIGN KEY ("categoriasId") REFERENCES "Categorias"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item_do_carrinho" ADD CONSTRAINT "Item_do_carrinho_carrinhoId_fkey" FOREIGN KEY ("carrinhoId") REFERENCES "Carrinho"("id") ON DELETE CASCADE ON UPDATE CASCADE;
