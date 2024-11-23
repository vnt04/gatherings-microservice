import { PartialType } from '@nestjs/mapped-types';
import { LoginDTO } from './login';

export class UpdateAuthDto extends PartialType(LoginDTO) {}
