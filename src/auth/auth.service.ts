import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user_entity';
import { Repository } from 'typeorm';
import * as bcrpt from 'bcrypt'
import { LoginDto } from 'src/user/dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        private readonly jwtService: JwtService
    ){}

    async register(createUserDto:CreateUserDto){
        const existing = await this.userRepository.findOne({where: {email: createUserDto.email}})
        if(existing) throw new BadRequestException("Email alread in use!")
        
        const hashedPassword = await bcrpt.hash(createUserDto.password, 10)
        const user = this.userRepository.create({...createUserDto, password: hashedPassword})
        return this.userRepository.save(user);
    }

    async login(loginDto:LoginDto){
        const user = await this.userRepository.findOne({where: {email: loginDto.email}})
        if(!user) throw new UnauthorizedException("Invalid login credential, please try again!")

       const isMatch = await bcrpt.compare(loginDto.password, user.password)
       if(!isMatch) throw new UnauthorizedException("The password is incorrect. Please try again.")

        const payload = {sub: user.id, email: user.email, role: user.role}
        const token = this.jwtService.sign(payload)

        return {
            user,
            access_token: token,
        }
    }
}
