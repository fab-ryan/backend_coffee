import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GeneratePassword, LoginDto } from './dto/create-auth.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LogoutDecorator } from '@decorators/logout.decorator';
import { AuthUser, Roles } from '@decorators';
import { AuthGuard, AuthUserType } from '@guards/auth.guard';
import { Role } from '@enums/role.enum';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() data: LoginDto) {
    return this.authService.login(data);
  }

  @Post('logout')
  logout() {
    return this.authService.logout();
  }

  @Post('generate-password')
  generatePassword(@Body() generateDTO: GeneratePassword) {
    return this.authService.generatePassword(generateDTO);
  }

  @ApiBearerAuth()
  @Roles(Role.ADMIN, Role.GUEST, Role.USER)
  @UseGuards(AuthGuard)
  @Get('user-info')
  authUser(@AuthUser() user: AuthUserType) {
    return this.authService.authUser(user.email);
  }
}
