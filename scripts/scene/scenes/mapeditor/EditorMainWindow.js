define(["require", "exports", "../../abstract/BaseBackScene", "../MainMenuScene", "../../../utils/globals/IoC", "../../../app/core/impl/ManagedComponent", "../../../utils/globals/Constants", "../../../ui/impl/buttons/spritebutton/SpriteButton", "../../../utils/globals/StringExtensions", "../../../components/mapeditor/SectionBuilder"], function (require, exports, BaseBackScene_1, MainMenuScene_1, IoC_1, ManagedComponent_1, Constants_1, SpriteButton_1, StringExtensions_1, SectionBuilder_1) {
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
                ...this.buttons,
                this.previewPanel,
                this.mapGrid
            ];
        }
        get buttons() {
            let keys = [
                "walls",
                "floors",
                "decorations",
                "items"
            ];
            return keys.map((section, index) => this.spriteSection(section, (index * 190) + 16));
        }
        spriteSection(section, xOffset) {
            let spriteGroup = new Phaser.Group(IoC_1.Container.game);
            SectionBuilder_1.SectionBuilder.getSection(section).forEach(sprite => spriteGroup.add(sprite));
            spriteGroup.visible = false;
            IoC_1.Container.game.add.existing(spriteGroup);
            return new SpriteButton_1.SpriteButton({
                x: xOffset,
                y: 600,
                initFrame: 'buttonLong_blue',
                pressedFrame: 'buttonLong_blue_pressed',
                text: StringExtensions_1.StringExtensions.capitalize(section),
                events: {
                    up: function () {
                        if (EditorMainWindow.prevGroup) {
                            EditorMainWindow.prevGroup.visible = false;
                        }
                        spriteGroup.visible = true;
                        EditorMainWindow.prevGroup = spriteGroup;
                    }
                }
            });
        }
        get previewPanel() {
            return new ManagedComponent_1.ManagedComponent(game => {
                let sprite = new Phaser.Sprite(game, Constants_1.Constants.windowWidth - 100 - Constants_1.Constants.gameWindowOffset.x, Constants_1.Constants.gameWindowOffset.y, "uifull", 'panel_blue');
                game.add.existing(sprite);
            });
        }
        get mapGrid() {
            var grid;
            let group = new Phaser.Group(IoC_1.Container.game);
            group.visible = false;
            for (let xCoordinate = Constants_1.Constants.mapOffset.x; xCoordinate <= Constants_1.Constants.mapWidth; xCoordinate += 32) {
                let graph = new Phaser.Graphics(IoC_1.Container.game, xCoordinate, Constants_1.Constants.mapOffset.y);
                graph.lineStyle(1, 0xd3d3d3, 1);
                graph.moveTo(xCoordinate, Constants_1.Constants.mapOffset.y);
                graph.lineTo(xCoordinate, Constants_1.Constants.mapHeight);
                let line = new Phaser.Sprite(IoC_1.Container.game, xCoordinate, Constants_1.Constants.mapOffset.y, graph.generateTexture());
                group.add(line);
            }
            for (let yCoordinate = Constants_1.Constants.mapOffset.y; yCoordinate <= Constants_1.Constants.mapHeight; yCoordinate += 32) {
                let graph = new Phaser.Graphics(IoC_1.Container.game, Constants_1.Constants.mapOffset.x, yCoordinate);
                graph.lineStyle(1, 0xd3d3d3, 1);
                graph.moveTo(Constants_1.Constants.mapOffset.x, yCoordinate);
                graph.lineTo(Constants_1.Constants.mapWidth - Constants_1.Constants.mapOffset.x, yCoordinate);
                let line = new Phaser.Sprite(IoC_1.Container.game, Constants_1.Constants.mapOffset.x, yCoordinate, graph.generateTexture());
                group.add(line);
            }
            grid = new ManagedComponent_1.ManagedComponent(game => game.add.existing(group));
            return grid;
        }
    }
    exports.EditorMainWindow = EditorMainWindow;
});
