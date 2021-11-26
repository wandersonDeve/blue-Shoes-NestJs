import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { ProdutoModule } from './produto/produto.module';
import { CarrinhoModule } from './carrinho/carrinho.module';
import { ItemDoCarrinhoModule } from './item-do-carrinho/item-do-carrinho.module';
import { MarcaModule } from './marca/marca.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    MarcaModule,
    UsuariosModule,
    AuthModule,
    ProdutoModule,
    CarrinhoModule,
    ItemDoCarrinhoModule,
    PedidosModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
