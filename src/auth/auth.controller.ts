import { Response } from 'express';
import { registerDTO, loginDTO } from './../dto_schema/user.dto';
import { Controller, Post, Body, Res, Delete, HttpStatus, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() body: registerDTO, @Res() res: Response) {

        //Checking if the user is already in the database
        const emailExists = await this.authService.emailExists(body.email);
        if (emailExists) {
            return res.status(HttpStatus.BAD_REQUEST).json({correct: false, message: 'Email already exists'});
        }

        //Create a new user
        try {

            const newUser = await this.authService.createUser(body.name, body.email, body.password);
            return res.status(HttpStatus.CREATED).json({correct: true});

        }
        catch (error) {

            return res.status(HttpStatus.BAD_REQUEST).json({correct: false, message: error});

        }
    }

    @Post('login')
    async login(@Body() body: loginDTO, @Res() res: Response) {
        
        //Checking if the user exists
        const user = await this.authService.emailExists(body.email);
        if (!user) {
            return res.status(HttpStatus.BAD_REQUEST).json({correct: false, message: 'Email or password is wrong'});
        }

        const isCorrect = await this.authService.authCheck(body.password, user.password);
        if (!isCorrect) {
            return res.status(HttpStatus.BAD_REQUEST).json({correct: false, message: 'Email or password is wrong'});
        }

        //Create and assing a token
        const token = await this.authService.getAccessToken(user._id);
        return res.header('auth_token', token).status(HttpStatus.OK).json({correct: true});
    }
    @Delete('logout')
    async logOut(@Res() res: Response) {

        return res.status(HttpStatus.OK).json({correct: true});

    }
}
