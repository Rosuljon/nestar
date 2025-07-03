import { Logger } from '@nestjs/common';
import { OnGatewayInit, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Server, WebSocket } from 'ws';

@WebSocketGateway({ transports: ['websocket'], secure: false })
export class SocketGateway implements OnGatewayInit {
	private logger: Logger = new Logger('SocketEventsGateway');
	private summaryClient = 0;

	// WebSocket server ishga tushganda chaqiriladi
	public afterInit(server: Server) {
		this.logger.log(`🟢 WebSocket Server Initialized. Current clients: ${this.summaryClient}`);
	}

	// Har bir yangi ulanishda chaqiriladi
	handleConnection(client: WebSocket, ...args: any[]) {
		this.summaryClient++;
		this.logger.log(`➕ Client connected. Total clients: ${this.summaryClient}`);
	}

	// Har bir disconnect bo‘lganda chaqiriladi
	handleDisconnect(client: WebSocket) {
		this.summaryClient--;
		this.logger.log(`➖ Client disconnected. Total clients: ${this.summaryClient}`);
	}

	// Client tomonidan yuborilgan "message" eventga javob beradi
	@SubscribeMessage('message')
	public handleMessage(client: WebSocket, payload: any): string {
		return 'Hello world!';
	}
}
