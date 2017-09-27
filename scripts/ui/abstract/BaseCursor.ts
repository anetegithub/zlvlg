import { ICursor } from '../interfaces/ICursor';

export abstract class BaseCursor implements ICursor {
	abstract url: string;
	set(game: Phaser.Game): void {
		if (game.device.android || game.device.iOS || game.device.windowsPhone) {
			return;
		} else {
			document.getElementById('content').style.cursor = `url(${this.url}), auto`;
		}
	}
}