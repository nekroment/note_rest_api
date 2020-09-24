import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from 'src/models/Post';

@Module({
    imports: [MongooseModule.forFeature([{name: Post.name, schema: PostSchema}])],
    controllers: [PostController],
    providers: [PostService]
})
export class PostModule {}
