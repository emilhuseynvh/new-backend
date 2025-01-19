import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './config';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { NewsModule } from './modules/news/news.module';
import { CategoryModule } from './modules/category/category.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: config.databaseURL,
      synchronize: true,
      logging: true,
      autoLoadEntities: true,
    }),
    JwtModule.register({
      global: true,
      secret: config.secretKey,
      signOptions: { expiresIn: '1d' },
    }),
    AuthModule,
    NewsModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
