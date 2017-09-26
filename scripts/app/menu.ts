import { } from "../../node_modules/phaser-ce/typescript/phaser";

export class MainMenu {
    constructor(game: Phaser.Game) {
        this.titleText = game.make.text(game.world.centerX, 100,
            " Zombie\nGraveyards", {
                font: 'bold 42pt TheMinion',
                fill: '#45ea3f',
                align: 'center'
            });
        this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        this.titleText.anchor.set(0.5);
        game.add.existing(this.titleText);
    }

    titleText: Phaser.Text;
}