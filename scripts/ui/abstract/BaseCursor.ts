import { } from "../../../node_modules/phaser-ce/typescript/phaser";
import { ICursor } from '../interfaces/ICursor';

export abstract class BaseCursor implements ICursor {
	abstract url: string;
	release(game: Phaser.Game): void {
		if (game.device.android || game.device.iOS || game.device.windowsPhone) {
			return;
		} else {
			document.getElementById('content').style.cursor = `url(${this.url}), auto`;
		}
	}
}