import { PostDTO, GetPostDTO } from './../dto_schema/post.dto';
import {
  Controller,
  Get,
  Body,
  Post,
  Param,
  Patch,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { PostService } from './post.service';
import { Response } from 'express';

@Controller('note')
export class PostController {
  constructor(private readonly postService: PostService) {}

  //GET BACK ALL THE POSTS
  @Get()
  async getPosts(@Body() body: GetPostDTO, @Res() res: Response) {
    try {

      const userNotes = await this.postService.getPosts(body.author);
      return res.status(HttpStatus.OK).json({correct: true, userNotes});

    } catch (error) {

      return res.status(HttpStatus.BAD_REQUEST).json({correct: false, message: error});

    }
  }

  //SUBMITS THE POST
  @Post()
  async CreatePost(@Body() body: PostDTO, @Res() res: Response) {
    const id: string = body.author;
    try {

      const newPost = await this.postService.createNewPost(body, id);
      return res.status(HttpStatus.OK).json({correct: true});

    } catch (error) {

      return res.status(HttpStatus.BAD_REQUEST).json({correct: false, message: error});
    }
  }

  //SPECIFIC POST
  @Get(':postId')
  async getSpecificPost(
    @Body() body: GetPostDTO, @Param() params, @Res() res: Response) {
    const id: string = body.author;
    try {
        const specificPost = await this.postService.getSpecificPost(params.postId, id);
        return res.status(HttpStatus.FOUND).json({correct: true, specificPost});

    } catch(error) {

        return res.status(HttpStatus.BAD_REQUEST).json({correct: false, message: error});

    }
  }

  //UPDATE A POST
  @Patch()
  async updatePost(@Body() body: PostDTO, @Res() res: Response) {
    const id: string = body.author;
    try {

        const updatePost = await this.postService.updatePost(body, id);
        return res.status(HttpStatus.OK).json({correct: true, updatePost});

    } catch(error) {

        return res.status(HttpStatus.BAD_REQUEST).json({correct: false, message: error});

    }
  }

  //DELETE A SPECIFIC POST
  @Delete(':postId')
  async deletePost(@Body() body: GetPostDTO, @Param() params, @Res() res: Response) {
    const id: string = body.author;
    try {
        const deletePost = await this.postService.deletePost(params.postId, id);
        return res.status(HttpStatus.OK).json({correct: true});

    } catch(error) {
        return res.status(HttpStatus.BAD_REQUEST).json({correct: false, message: error});

    }
  }
}
