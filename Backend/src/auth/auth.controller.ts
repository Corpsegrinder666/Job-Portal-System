import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    try {
      return await this.authService.signup(signupDto);
    } catch (error) {
      throw new HttpException(
        error?.message || 'Signup failed',
        error?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      return await this.authService.login(loginDto);
    } catch (error) {
      throw new HttpException(
        error?.message || 'Login failed',
        error?.status || HttpStatus.UNAUTHORIZED,
      );
    }
  }

  @Post('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    // If you use cookies for auth, clear cookie here:
    // res.clearCookie('jwtToken'); // example

    // Otherwise just return success:
    return res.status(200).json({ message: 'Logged out successfully' });
  }
}
