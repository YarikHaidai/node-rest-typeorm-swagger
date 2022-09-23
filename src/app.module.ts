import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from './config/config.service';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ConfigService.getOrmConfig() as any),
    UserModule,
    AuthModule,
    PostModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
