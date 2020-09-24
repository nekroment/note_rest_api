import { PostMiddleware } from './middleware/post.middleware';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
require('dotenv/config');

const connectionString = `mongodb+srv://${process.env.DB_LOGIN}:${process.env.DB_PASSWORD}@cluster0.zkmbj.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

@Module({
  imports: [MongooseModule.forRoot(connectionString), PostModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PostMiddleware)
      .forRoutes('note');
    consumer
      .apply(PostMiddleware)
      .forRoutes('auth/logout');
  }
}
