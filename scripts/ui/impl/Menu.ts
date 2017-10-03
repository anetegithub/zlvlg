import { } from "../../app/core/interfaces/IManagedResource";

export class MainMenu implements IManagedResource {
    release(game: Phaser.Game) {
        var loader = new Phaser.Loader(game);
        loader.image('logo', 'images/environment/BG0.png');
        loader.onLoadComplete.add(() => {
            var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
            logo.anchor.setTo(0.5, 0.5);

            this.titleText = game.make.text(game.world.centerX, 150,
                " Zombie\nGraveyards", {
                    font: 'bold 42pt TheMinion',
                    fill: '#45ea3f',
                    align: 'center'
                });
            this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
            this.titleText.anchor.set(0.5);
            game.add.existing(this.titleText);
        });
    }

    titleText: Phaser.Text;
}