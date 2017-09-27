import { ICursor } from "./interfaces/ICursor";

export abstract class BaseCursor implements ICursor {
	abstract url: string;
	set(game: Phaser.Game): void {
		if (game.device.desktop) {
			game.canvas.style.cursor = `url("${this.url}") pointer`;
		}
	}
}