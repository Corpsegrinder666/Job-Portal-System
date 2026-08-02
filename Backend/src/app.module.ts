import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module'; 
import { JobModule } from './job/job.module';
import { Job } from './job/entity/job.entity';
import { User } from './user/entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Boixosnois69',
      database: 'JobPortal',
      autoLoadEntities: true,
      synchronize: true,
      entities: [Job,User]
    }),
    UserModule,
    AuthModule,
    JobModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
