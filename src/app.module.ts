import { Module } from '@nestjs/common';
import { LoggerModule } from './infrastructure/logger/logger.module';
import { ExceptionsModule } from './infrastructure/exceptions/exceptions.module';
import { RepositoriesModule } from './infrastructure/repositories/repositories.module';
import { UsecasesProxyDynamicModule } from './infrastructure/usecases-proxy/usecases-proxy.module';
import { VideoController } from './infrastructure/common/controller/video.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './infrastructure/common/strategies/jwt.strategy';

@Module({
  imports: [
    LoggerModule,
    ExceptionsModule,
    RepositoriesModule,
    UsecasesProxyDynamicModule.register(),
    JwtModule.register({}),
  ],
  providers: [JwtStrategy],
  controllers: [VideoController],
})
export class AppModule {}
