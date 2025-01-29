import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private  readonly UserService : UserService)
  @Get()
  getAllUser() {
    return [{ length: this.getAllUser().length, users: this.getAllUser() }];
  }
  @Get(':id')
  getSingleUser(@Param('id') id: string) {
    return this.getSingleUser(id);
  }
}
