-- DropForeignKey
ALTER TABLE "Item_do_carrinho" DROP CONSTRAINT "Item_do_carrinho_carrinhoId_fkey";

-- CreateTable
CREATE TABLE "Pedidos" (
    "id" SERIAL NOT NULL,
    "carrinhoId" INTEGER,
    "endereco" TEXT,
    "boleto" TEXT,

    CONSTRAINT "Pedidos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Item_do_carrinho" ADD CONSTRAINT "Item_do_carrinho_carrinhoId_fkey" FOREIGN KEY ("carrinhoId") REFERENCES "Carrinho"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedidos" ADD CONSTRAINT "Pedidos_carrinhoId_fkey" FOREIGN KEY ("carrinhoId") REFERENCES "Carrinho"("id") ON DELETE SET NULL ON UPDATE CASCADE;
