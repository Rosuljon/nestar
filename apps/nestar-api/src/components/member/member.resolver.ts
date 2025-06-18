import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MemberService } from './member.service';
import { LoginInput, MemberInput } from '../../libs/dto/member/member.input';
import { Member } from '../../libs/dto/member/member';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import { ObjectId } from 'mongoose';
import { Roles } from '../auth/decorators/roles.decorator';
import { MemberType } from '../../libs/enums/member.enum';
import { RolesGuard } from '../auth/guards/roles.guard';
import { MemberUpdate } from '../../libs/dto/member/member.update';
import { shapeIntoMongoObjectId } from '../../libs/config';
import { WithoutGuard } from '../auth/guards/without.guard';

// 1. Middleware
// 2. Guard
// 3. Interceptor (before controller call)
// 4. Pipe (parameter-level)
// 5. Controller (handler)
// 6. Interceptor (after)

@Resolver()
export class MemberResolver {
	constructor(private readonly memberService: MemberService) {}

	// Signup
	@Mutation(() => Member)
	public async signup(@Args('input') input: MemberInput): Promise<Member> {
		console.log('MemberResolver.signup called');

		return this.memberService.signup(input);
	}

	// Login
	@Mutation(() => Member)
	public async login(@Args('input') input: LoginInput): Promise<Member> {
		console.log('MemberResolver.login called');
		return this.memberService.login(input);
	}

	// Check Auth
	@UseGuards(AuthGuard)
	@Query(() => String)
	public async checkAuth(@AuthMember('memberNick') memberNick: string): Promise<string> {
		console.log('MemberResolver.checkAuth called');

		console.log('memberNick => ', memberNick);
		return `Hi I am ${memberNick}`;
	}

	// Check Auth with Roles
	@Roles(MemberType.USER, MemberType.AGENT)
	@UseGuards(RolesGuard)
	@Query(() => String)
	public async checkAuthRoles(@AuthMember() member: Member): Promise<string> {
		console.log('MemberResolver.checkAuthRoles called');

		console.log('memberNick => ', member.memberNick);
		return `Hi ${member.memberNick} and you are a ${member.memberType}`;
	}

	// Update Member
	@UseGuards(AuthGuard)
	@Mutation(() => Member)
	public async updateMember(
		@Args('input') input: MemberUpdate,
		@AuthMember('_id') memberId: ObjectId,
	): Promise<Member> {
		console.log('MemberResolver.updateMember called');
		delete input._id;
		return this.memberService.updateMember(memberId, input);
	}

	// Get Member
	@UseGuards(WithoutGuard)
	@Query(() => Member)
	public async getMember(@Args('memberId') input: string, @AuthMember('_id') memberId: ObjectId): Promise<Member> {
		console.log('MemberResolver.getMember called');
		const targetId = shapeIntoMongoObjectId(input);
		return this.memberService.getMember(memberId, targetId);
	}

	//Admin

	//Authorization : Admin
	@Roles(MemberType.ADMIN)
	@UseGuards(RolesGuard)
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
