import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, HttpAdapterHost } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './common/filters/exceptionHttpFilter.filter';
import { ResponseTransformerInterceptor } from './core/http/response-transformer.interceptor';
import { SearchModule } from './search/search.module';
import UserController from './user/user.controller';
import { UserModule } from './user/user.module';
import UserService from './user/user.service';

@Module({
  imports: [
    SearchModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseTransformerInterceptor
    }
  ],
})
export class AppModule {}
