import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ReportModule } from './report/report.module';
import { Report } from './report/report.entity';
import { User } from './user/user.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type:'sqlite',
    database:'db.sqlite',
    entities:[User,Report],
    synchronize:true,
  }),UserModule, ReportModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
