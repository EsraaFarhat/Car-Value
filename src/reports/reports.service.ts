import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private repository: Repository<Report>,
  ) {}

  create(reportDto: CreateReportDto, user: User) {
    const report = this.repository.create(reportDto);
    report.user = user;

    return this.repository.save(report);
  }

  findOne(id: number) {
    if (!id) {
      return null;
    }
    return this.repository.findOne({
      where: { id },
      relations: ['user'],
    });
  }
}
