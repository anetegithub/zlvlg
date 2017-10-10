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
                { key: 'asset', url: './images/environment/assets/calciumtrice simple.png' }
            ];
        }
        get tilemap() {
            return new ManagedComponent_1.ManagedComponent(game => {
                var assetMap = new Phaser.Sprite(game, 0, 0, 'asset');
                //assetMap.scale.setTo(assetMap.width * 2, assetMap.height * 2);
                debugger;
                assetMap.scale.x = 2;
                assetMap.scale.y = 2;
                game.add.existing(assetMap);
            });
        }
        get lines() {
            this.onBack = () => IoC_1.Container.debug = [];
            let linesArr = [];
            let xStartFrom = 0;
            let yStartFrom = 0;
            for (let i = 0; i < 896 / 32; i++) {
                let y = (i * 32) + yStartFrom;
                let line = new Phaser.Line(xStartFrom, y, 800 - xStartFrom, y);
                IoC_1.Container.debug.push(() => {
                    IoC_1.Container.game.debug.geom(line, 'blue');
                });
                //draw horizontal line
            }
            for (let i = 0; i < 800 / 32; i++) {
                let x = (i * 32) + xStartFrom;
                let line = new Phaser.Line(x, yStartFrom, x, 896 - yStartFrom);
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
