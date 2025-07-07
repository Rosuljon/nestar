import { Injectable } from '@nestjs/common';

@Injectable()
export class BatchService {
	getHello(): string {
		return 'Hello World!';
	}

	public async batchRollback(): Promise<void> {
		console.log('Batch rollback executed');
	}
	public async batchTopProperties(): Promise<void> {
		console.log('Batch top properties executed');
	}
	public async batchTopAgents(): Promise<void> {
		console.log('Batch top agents executed');
	}
}
