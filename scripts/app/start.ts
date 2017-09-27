import { } from "../../node_modules/phaser-ce/typescript/phaser";
import ICursor = require('../ui/interfaces/ICursor');
import ZombieCursor = require('../ui/impl/ZombieHand');
import m = require('./menu');

class SimpleGame {
    constructor(cursor: ICursor.ICursor) {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: this.preload, create: this.create });
        cursor.set(this.game);
    }

    game: Phaser.Game;

    preload() {
        this.game.load.image('logo', 'images/environment/BG0.png');
    }

    create() {
        var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        logo.anchor.setTo(0.5, 0.5);
        new m.MainMenu(this.game);
    }
}

//comment for intellisence
declare var WebFont: any;

WebFont.load({
    custom: {
        families: ['TheMinion'],
        urls: ['./styles/app.css']
    },
    active: () => {
        new SimpleGame(new ZombieCursor.ZombieHand());
    }
});