import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
const jwt = require('jsonwebtoken');

@Injectable()
export class PostMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: Function){

        const token = req.header('auth_token');
        if (!token) {
            return res.status(HttpStatus.BAD_REQUEST).send({correct: false, message: 'Access Denied'});
        }
        try {
            const verified = jwt.verify(token, process.env.TOKEN_SECRET);
            req.body.author = verified;
            next();
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).send({correct: false, message: 'Invalid Token'});
        }
    }
}