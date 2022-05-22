import { ConfigModule } from '@nestjs/config';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SocialsModule } from './socials/socials.module';
import { AuthModule } from './auth/auth.module';
import { TokensMiddleware } from './tokens/tokens.middleware';
import { TokensModule } from './tokens/tokens.module';
import { SubscribesModule } from './subscribes/subscribes.module';
import { UserToSubscribesModule } from './user-to-subscribes/user-to-subscribes.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    SocialsModule,
    AuthModule,
    TokensModule,
    SubscribesModule,
    UserToSubscribesModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TokensMiddleware).forRoutes('*');
  }
}
