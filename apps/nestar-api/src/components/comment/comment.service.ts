import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Comment } from '../../libs/dto/comment/comment';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CommentService {
	constructor(@InjectModel('Comment') private readonly commentNodel: Model<Comment>) {}
}
