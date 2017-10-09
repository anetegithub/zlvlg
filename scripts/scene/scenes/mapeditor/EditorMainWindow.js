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
                var assetMap = new Phaser.Sprite(game, 0, 900 - 208, 'asset');
                game.add.existing(assetMap);
            });
        }
        get lines() {
            this.onBack = () => IoC_1.Container.debug = [];
            let linesArr = [];
            let xStartFrom = (800 % 41.6) / 2;
            let yStartFrom = (600 % 41.6) / 2;
            for (let index = 0; index < 600 / 41.6; index++) {
                let y = yStartFrom + (index * 41.6);
                let line = new Phaser.Line(xStartFrom, y, 600 - xStartFrom, y);
                IoC_1.Container.debug.push(() => {
                    IoC_1.Container.game.debug.geom(line, 'blue');
                });
                //draw horizontal line
            }
            for (var index = 0; index < 800 / 41.6; index++) {
                let x = xStartFrom + (index * 41.6);
                let line = new Phaser.Line(x, yStartFrom, x, 800 - yStartFrom);
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
