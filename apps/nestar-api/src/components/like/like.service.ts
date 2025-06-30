import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Like } from '../../libs/dto/like/like';

@Injectable()
export class LikeService {
	@InjectModel('Like') private readonly commentModel: Model<Like>;
}
