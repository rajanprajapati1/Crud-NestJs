import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {} // ✅ Fixed casing

    @Get()
    getAllUser() {
        return this.userService.getAllUser(); // ✅ Call the service method instead of itself
    }

    @Get(':id')
    getSingleUser(@Param('id') id: string) {
        return this.userService.getSingleUser(parseInt(id, 10)); // ✅ Convert id to number
    }

    @Post()
    CreateNewUser(@Body() createUserDto:any){
      return this.userService.CreateUser(createUserDto)
    }

    @Put(':id')
    UpdateUserT(@Param('id') id , @Body() payload:any){
      return this.userService.UpdateUser(id ,payload)
    }
    @Delete(':id')
    DeleteUserFromF(@Param('id') id){
      return this.userService.DeleteUser(id)
    }
}
