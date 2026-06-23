import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TerminusModule } from '@nestjs/terminus';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { HealthController } from './modules/health/health.controller';
import { CvModule } from './modules/cv/cv.module';

@Module({
  imports: [
    // Config — available globally
    ConfigModule.forRoot({ isGlobal: true }),

    // Database — configurable via environment variables
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: (config.get<string>('DB_TYPE', 'sqlite') as any),
        database: config.get<string>('DB_DATABASE', 'database.sqlite'),
        host: config.get<string>('DB_HOST', undefined),
        port: config.get<number>('DB_PORT', undefined),
        username: config.get<string>('DB_USERNAME', undefined),
        password: config.get<string>('DB_PASSWORD', undefined),
        autoLoadEntities: true,
        synchronize: true,
        logging: config.get<string>('NODE_ENV') === 'development',
      }),
    }),

    TerminusModule,
    AuthModule,
    UsersModule,
    CvModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
