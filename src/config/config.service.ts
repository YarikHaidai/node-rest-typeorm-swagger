import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

@Injectable()
export class ConfigService {
  static getVariable(key: string) {
    const variable = process.env[key];
    if (!variable) {
      throw new Error(`Environment variable ${key} is undefined`);
    }
    return variable;
  }

  static getOrmConfig() {
    const {
      DATABASE_TYPE,
      DATABASE_HOST,
      DATABASE_USER,
      DATABASE_PASSWORD,
      DATABASE_PORT,
      DATABASE_NAME,
      DATABASE_ENTITIES,
      DATABASE_SYNCHRONIZE,
    } = process.env;

    return {
      type: DATABASE_TYPE || 'mysql',
      host: DATABASE_HOST || 'localhost',
      port: DATABASE_PORT || '3306',
      username: DATABASE_USER || 'root',
      password: DATABASE_PASSWORD || 'password',
      database: DATABASE_NAME || 'restful',
      entities: [DATABASE_ENTITIES || 'dist/**/*.entity{.ts,.js}'],
      synchronize: DATABASE_SYNCHRONIZE || true,
    };
  }
}
