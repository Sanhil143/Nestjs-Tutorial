import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { Report } from './report.entity';
import { ReportService } from './report.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Report])],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
