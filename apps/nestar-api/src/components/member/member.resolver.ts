import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MemberService } from './member.service';
import { InternalServerErrorException, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoginInput, MemberInput } from '../../libs/dto/member/member.input';
import { Member } from '../../libs/dto/member/member';

@Resolver()
export class MemberResolver {
	constructor(private readonly memberService: MemberService) {}

	@Mutation(() => Member)
	@UsePipes(ValidationPipe)
	public async signup(@Args('input') input: MemberInput): Promise<Member> {
		try {
			console.log('MemberResolver.signup called');
			console.log('Input:', input);
			return this.memberService.signup(input);
		} catch (error) {
			console.log('Error in MemberResolver.signup:', error);
			throw new InternalServerErrorException(error);
		}
	}

	@Mutation(() => String)
	@UsePipes(ValidationPipe)
	public async login(@Args('input') input: LoginInput): Promise<string> {
		try {
			console.log('MemberResolver.login called');
			return this.memberService.login();
		} catch (error) {
			console.log('Error in MemberResolver.signup:', error);
			throw new InternalServerErrorException(error);
		}
	}
	@Mutation(() => String)
	public async updateMember(): Promise<string> {
		console.log('MemberResolver.updateMember called');

		return this.memberService.updateMember();
	}
	@Query(() => String)
	public async getMember(): Promise<string> {
		console.log('MemberResolver.getMember called');

		return this.memberService.getMember();
	}
}
