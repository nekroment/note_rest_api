import { Injectable } from '@nestjs/common';
import { PostDTO } from 'src/dto_schema/post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from 'src/models/Post';
import { Model } from 'mongoose';

@Injectable()
export class PostService {
    constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

    async getPosts(author: string): Promise<Post[]> {
        return this.postModel.find({author});
    }
    async createNewPost(body: PostDTO, id: string): Promise<Post> {
        const createPost = new this.postModel({
            title: body.title,
            description: body.description,
            author: id
        })
        return createPost.save();
    }
    async getSpecificPost (id: string, authorId: string): Promise<Post[]> {
        return this.postModel.find({_id: id, author: authorId});
    }
    async updatePost (body: PostDTO, id: string): Promise<Post[]> {
        return this.postModel.updateOne({_id: body._id, author: id}, { $set: {title: body.title, description: body.description}})
    }
    async deletePost(id: string, authorId: string): Promise<{}> {
        const deleted = this.postModel.remove({ _id: id, author: authorId });
        return deleted;
    }
}
