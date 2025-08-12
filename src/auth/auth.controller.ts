import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginDto } from 'src/user/dto/login.dto';
import { ResponseDto } from 'src/common/dto/response-dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @Post('register')
    @Public()
    async register(
        @Body() createUserDto: CreateUserDto,
    ) {
        const result = await this.authService.register(createUserDto)
        return new ResponseDto(result, 'Registration Successful!')
    }

    @Post('login')
    @Public()
    async login(
        @Body() loginDto:LoginDto,
    ) {
        const result = await this.authService.login(loginDto)
        return new ResponseDto(result, 'Login Successful')
    }
}
