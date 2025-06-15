import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MemberService } from './member.service';
import { LoginInput, MemberInput } from '../../libs/dto/member/member.input';
import { Member } from '../../libs/dto/member/member';

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
