define(["require", "exports", "../../abstract/BaseBackScene", "../MainMenuScene", "../../../utils/globals/IoC", "../../../app/core/impl/ManagedComponent"], function (require, exports, BaseBackScene_1, MainMenuScene_1, IoC_1, ManagedComponent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class EditorMainWindow extends BaseBackScene_1.BaseBackScene {
        constructor() {
            super(...arguments);
            this.backScene = MainMenuScene_1.MainMenuScene;
            this.name = "EditorMainWindow";
            this.clear = true;
        }
        get components() {
            return [
                ...super.components,
                this.tilemap,
                ...this.lines
            ];
        }
        get resources() {
            return [
                ...super.resources,
                { key: 'asset', url: './images/environment/assets/dungeon-bicubic.png' }
            ];
        }
        get tilemap() {
            return new ManagedComponent_1.ManagedComponent(game => {
                var assetMap = new Phaser.Sprite(game, 0, 900 - 208 - 18, 'asset');
                game.add.existing(assetMap);
            });
        }
        get lines() {
            this.onBack = () => IoC_1.Container.debug = [];
            let linesArr = [];
            let xStartFrom = 0;
            let yStartFrom = 18;
            for (let i = 0; i < 900 / 48; i++) {
                let y = (i * 48) + yStartFrom;
                let line = new Phaser.Line(xStartFrom, y, 800 - xStartFrom, y);
                IoC_1.Container.debug.push(() => {
                    IoC_1.Container.game.debug.geom(line, 'blue');
                });
                //draw horizontal line
            }
            for (let i = 0; i < 800 / 48; i++) {
                let x = (i * 48) + xStartFrom;
                let line = new Phaser.Line(x, yStartFrom, x, 900 - yStartFrom);
                IoC_1.Container.debug.push(() => {
                    IoC_1.Container.game.debug.geom(line, 'blue');
                });
                //draw vertical line
            }
            return linesArr;
        }
    }
    exports.EditorMainWindow = EditorMainWindow;
});
