import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from './config/config.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(ConfigService.getOrmConfig() as any),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
