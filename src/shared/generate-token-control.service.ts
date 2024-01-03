import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GenerateTokenService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(data: GenerateToken): Promise<string> {
    return await this.jwtService.signAsync(data);
  }
}

export interface GenerateToken {
  email: string;
  name: string;
  id: string;
  phone: string;
  status: boolean;
  role: string;
}
