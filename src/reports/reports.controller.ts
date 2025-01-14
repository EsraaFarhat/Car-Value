import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dtos/create-report.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ReportDto } from './dtos/report.dto';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user) {
    return this.reportsService.create(body, user);
  }

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const report = await this.reportsService.findOne(parseInt(id));
    if (!report) {
      throw new NotFoundException('Report not found');
    }
    return report;
  }
}
