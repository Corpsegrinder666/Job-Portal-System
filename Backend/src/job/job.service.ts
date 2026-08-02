import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Job } from './entity/job.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
  ) {}

  // ✅ Create a new job
  async create(createJobDto: CreateJobDto): Promise<Job> {
    const newJob = this.jobRepository.create(createJobDto);
    return this.jobRepository.save(newJob);
  }

  // ✅ Get all jobs
  async findAll(): Promise<Job[]> {
    return this.jobRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  // ✅ Get job by ID
  async findOne(id: string): Promise<Job> {
    const job = await this.jobRepository.findOne({ where: { id } });
    if (!job) throw new NotFoundException(`Job with ID ${id} not found`);
    return job;
  }

  // ✅ Update a job
  async update(id: string, updateJobDto: UpdateJobDto): Promise<Job> {
    const job = await this.findOne(id);
    Object.assign(job, updateJobDto);
    return this.jobRepository.save(job);
  }

  // ✅ Delete a job
  async remove(id: string): Promise<void> {
    const job = await this.findOne(id);
    await this.jobRepository.remove(job);
  }

  // 🔍 Optional: Search jobs by title
  async searchByTitle(keyword: string): Promise<Job[]> {
    return this.jobRepository.find({
      where: { title: ILike(`%${keyword}%`) },
    });
  }
}
