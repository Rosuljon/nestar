import { registerEnumType } from '@nestjs/graphql';

export enum MemberType {
	USER = 'USER',
	ADMIN = 'ADMIN',
	AGENT = 'AGENT',
}
registerEnumType(MemberType, { name: 'MemberType' });
export enum MemberStatus {
	ACTIVE = 'ACTIVE',
	BLOCK = 'BLOCK',
	DELETE = 'DELETE',
}
registerEnumType(MemberStatus, { name: 'MemberStatus' });
export enum MemberAuthType {
	EMAIL = 'EMAIL',
	PHONE = 'PHONE',
	TELEGRAM = 'TELEGRAM',
}
registerEnumType(MemberAuthType, { name: 'MemberAuthType' });
