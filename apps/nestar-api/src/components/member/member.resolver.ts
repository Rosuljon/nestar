import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MemberService } from './member.service';
import { LoginInput, MemberInput } from '../../libs/dto/member/member.input';
import { Member } from '../../libs/dto/member/member';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import { ObjectId } from 'mongoose';

@Resolver()
export class MemberResolver {
	constructor(private readonly memberService: MemberService) {}

	@Mutation(() => Member)
	public async signup(@Args('input') input: MemberInput): Promise<Member> {
		console.log('MemberResolver.signup called');

		return this.memberService.signup(input);
	}

	@Mutation(() => Member)
	public async login(@Args('input') input: LoginInput): Promise<Member> {
		console.log('MemberResolver.login called');
		return this.memberService.login(input);
	}
	@UseGuards(AuthGuard)
	@Mutation(() => String)
	public async updateMember(@AuthMember('_id') memberId: ObjectId): Promise<string> {
		console.log('MemberResolver.updateMember called');
		console.log(memberId);

		return this.memberService.updateMember();
	}
	@UseGuards(AuthGuard)
	@Query(() => String)
	public async checkAuth(@AuthMember('memberNick') memberNick: string): Promise<string> {
		console.log('MemberResolver.checkAuth called');

		console.log('memberNick => ', memberNick);
		return `Hi I am ${memberNick}`;
	}
	@Query(() => String)
	public async getMember(): Promise<string> {
		console.log('MemberResolver.getMember called');

		return this.memberService.getMember();
	}

	//Admin

	//Authorization : Admin
	@Mutation(() => String)
	public async getAllMembersByAdmin(): Promise<string> {
		console.log('MemberResolver.getAllMembersByAdmin called');

		return this.memberService.getAllMembersByAdmin();
	}

	@Mutation(() => String)
	public async updateMemberByAdmin(): Promise<string> {
		console.log('MemberResolver.updateMemberByAdmin called');

		return this.memberService.updateMemberByAdmin();
	}
}
