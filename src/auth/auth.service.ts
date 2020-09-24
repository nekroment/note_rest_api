import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/models/User';
import { Model } from 'mongoose';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv/config');

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async emailExists(email: string): Promise<User> {
        return this.userModel.findOne({email: email});
    }
    async authCheck(verifyPassword: string, hashPassword: string): Promise<string>  {
        return bcrypt.compare(verifyPassword, hashPassword);
    }
    async getAccessToken(id: string): Promise<string> {
        return jwt.sign({_id: id}, process.env.TOKEN_SECRET);
    }
    async createUser(name: string, email: string, password: string): Promise<User> {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new this.userModel({
            name: name,
            email: email,
            password: hashedPassword
        });
        return newUser.save();
    }
}
