import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { MemberService } from './member.service';

@Resolver()
export class MemberResolver {
	constructor(private readonly memberService: MemberService) {}

	@Mutation(() => String)
	public async signup(): Promise<string> {
		console.log('MemberResolver.signup called');

		return this.memberService.signup();
	}
	@Mutation(() => String)
	public async login(): Promise<string> {
		console.log('MemberResolver.login called');

		return this.memberService.login();
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
