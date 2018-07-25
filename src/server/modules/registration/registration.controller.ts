import { Get, Post, Body, Put, Delete, Param, Controller, ValidationPipe, UsePipes } from '@nestjs/common';
import {RegistrationService} from '../../modules/common/services/index';
import {CreateUserDto} from './dto';

@Controller()
export class RegistrationController {

  constructor(private readonly registrationService: RegistrationService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() userData: CreateUserDto) {
    return this.registrationService.create(userData);
  }
}