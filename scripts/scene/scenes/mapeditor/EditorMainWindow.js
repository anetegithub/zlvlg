define(["require", "exports", "../../abstract/BaseBackScene", "../MainMenuScene", "../../../utils/globals/IoC", "../../../app/core/impl/ManagedResource"], function (require, exports, BaseBackScene_1, MainMenuScene_1, IoC_1, ManagedResource_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class EditorMainWindow extends BaseBackScene_1.BaseBackScene {
        constructor() {
            super();
            this.backScene = MainMenuScene_1.MainMenuScene;
            this.name = "EditorMainWindow";
            this.clear = true;
            this.addComponents([
                this.tilemap,
                ...this.lines
            ]);
            this.load([
                { key: 'asset', url: './images/environment/assets/dungeon-bicubic.png' }
            ]);
        }
        get tilemap() {
            return new ManagedResource_1.ManagedResource(game => {
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
