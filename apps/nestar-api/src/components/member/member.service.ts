import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MemberService {
	constructor(@InjectModel('Member') private readonly memberModel: Model<null>) {}
	public async signup(): Promise<string> {
		console.log('MemberService.signup called');
		return 'Member signup successful';
	}
	public async login(): Promise<string> {
		console.log('MemberService.login called');
		return 'Member login successful';
	}
	public async updateMember(): Promise<string> {
		console.log('MemberService.updateMember called');
		return 'Member update successful';
	}
	public async getMember(): Promise<string> {
		console.log('MemberService.getMember called');
		return 'Member details retrieved successfully';
	}
}
