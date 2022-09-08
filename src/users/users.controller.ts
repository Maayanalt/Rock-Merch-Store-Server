import {
  Body,
  Controller,
  Get,
  Post,
  Session,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { LoginDto, UsersDto } from './users-dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {}
