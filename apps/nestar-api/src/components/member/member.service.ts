import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Member } from '../../libs/dto/member/member';
import { MemberInput } from '../../libs/dto/member/member.input';
import { log } from 'console';

@Injectable()
export class MemberService {
	constructor(@InjectModel('Member') private readonly memberModel: Model<Member>) {}
	public async signup(input: MemberInput): Promise<Member> {
		//todo hash password
		try {
			const result = await this.memberModel.create(input);
			//todo auth token
			return result;
		} catch (error) {
			log('Error in MemberService.signup:', error);
			throw new BadRequestException(error);
		}
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
