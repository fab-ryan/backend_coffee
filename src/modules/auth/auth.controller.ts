import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GeneratePassword, LoginDto } from './dto/create-auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { LogoutDecorator } from '@decorators/logout.decorator';

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
}
