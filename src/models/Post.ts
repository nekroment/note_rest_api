import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Post extends Document {
    @Prop({required: true})
    title: string;

    @Prop({required: true})
    description: string;

    @Prop({required: true})
    author: string;

    @Prop({default: Date.now})
    date: Date
}

export const PostSchema = SchemaFactory.createForClass(Post);