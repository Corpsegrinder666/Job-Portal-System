import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { JwtGuard } from '../auth/jwt.guard';

@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  // ✅ Create Job (Protected)
  @UseGuards(JwtGuard)
  @Post()
  async createJob(@Body() createJobDto: CreateJobDto) {
    return this.jobService.create(createJobDto);
  }

  // ✅ Get All Jobs (Public)
  @Get()
  async getAllJobs() {
    return this.jobService.findAll();
  }

  // ✅ Get Job by ID (Public)
  @Get(':id')
  async getJobById(@Param('id') id: string) {
    return this.jobService.findOne(id);
  }

  // ✅ Update Job (Protected)
  @UseGuards(JwtGuard)
  @Put(':id')
  async updateJob(
    @Param('id') id: string,
    @Body() updateJobDto: UpdateJobDto,
  ) {
    return this.jobService.update(id, updateJobDto);
  }

  // ✅ Delete Job (Protected)
  @UseGuards(JwtGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteJob(@Param('id') id: string): Promise<void> {
    return this.jobService.remove(id);
  }
}
