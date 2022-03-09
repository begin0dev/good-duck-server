import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { AuthGuard, authTarget } from '../guards/auth.guard';
import { FindUserDto } from './dtos/findUser.dto';
import { UsersService } from '../users/users.service';
import { CurrentUser, UserSerializer } from '../serializers/user.serializer';
import { JsendReturnType } from '../types/jsend.types';
import modelSerializer from '../helpers/model-serializer';

@Controller('socials')
@UseGuards(AuthGuard(authTarget.VISITOR))
export class SocialsController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async login(@Body() findUserDto: FindUserDto): Promise<JsendReturnType<CurrentUser>> {
    const user = await this.usersService.findOrCreate(findUserDto.provider, findUserDto.accessToken);
    console.log(user);
    return {
      payload: modelSerializer(user, UserSerializer),
    };
  }
}
