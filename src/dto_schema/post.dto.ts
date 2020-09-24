import { IsNotEmpty, IsString } from 'class-validator';

export class PostDTO {
    _id: string;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    author: string;
}

export class GetPostDTO {
    
    author: string;
}