define(["require", "exports", "../../ui/impl/buttons/textbutton/TextButton", "../scenes/ui/NicknameInput", "../../ui/impl/text/ManagedText", "../../utils/globals/Constants", "../../app/core/impl/ManagedComponent", "./mapeditor/EditorMainWindow", "../abstract/SpriteMapScene"], function (require, exports, TextButton_1, NicknameInput_1, ManagedText_1, Constants_1, ManagedComponent_1, EditorMainWindow_1, SpriteMapScene_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class MainMenuScene extends SpriteMapScene_1.SpriteMapScene {
        constructor() {
            super(...arguments);
            this.name = "MainMenu";
            this.clear = true;
        }
        get resources() {
            return [
                ...super.resources,
                { key: 'logo', url: './images/environment/splash.png' },
            ];
        }
        get components() {
            return [
                this.splash,
                this.newGame,
                this.loadSave,
                this.title,
                this.mapEditor,
                this.license
            ];
        }
        get license() {
            return new ManagedComponent_1.ManagedComponent(game => {
                var sprite = new Phaser.Sprite(game, 30, 550, 'sprites', 'license');
                sprite.scale.x = 2;
                sprite.scale.y = 2;
                var bmp = game.make.bitmapData(sprite.width, sprite.height - 12);
                bmp.fill(255, 255, 255);
                bmp.addToWorld(30, 550 + 5);
                game.add.existing(sprite);
            });
        }
        get splash() {
            return new ManagedComponent_1.ManagedComponent(game => {
                var logo = game.add.sprite(game.world.centerX, Constants_1.Constants.centerY, 'logo');
                logo.anchor.setTo(0.5, 0.5);
            });
        }
        get title() {
            var fxdStyle = this.fontStyle;
            fxdStyle.font = `bold 42pt ` + Constants_1.Constants.fontFamily;
            fxdStyle.fill = Constants_1.Constants.color;
            return new ManagedText_1.ManagedText({
                fontStyle: fxdStyle,
                y: 165,
                text: 'Mystical\nDungeon'
            });
        }
        get newGame() {
            return new TextButton_1.TextButton({
                fontStyle: this.fontStyle,
                y: 365,
                text: 'New Game',
                events: {
                    up: function () {
                        new NicknameInput_1.NicknameInput().run();
                    }
                }
            });
        }
        get loadSave() {
            var style = this.fontStyle;
            style.fill = '#929293';
            return new TextButton_1.TextButton({
                fontStyle: style,
                y: 415,
                text: 'Load Game'
            });
        }
        get mapEditor() {
            return new TextButton_1.TextButton({
                text: 'Map Editor',
                y: 465,
                fontStyle: this.fontStyle,
                events: {
                    up: function () {
                        new EditorMainWindow_1.EditorMainWindow().run();
                    }
                }
            });
        }
        get fontStyle() {
            return {
                font: `bold 24pt  ` + Constants_1.Constants.fontFamily,
                fill: "#FFFFFF",
                align: 'center'
            };
        }
    }
    exports.MainMenuScene = MainMenuScene;
});
