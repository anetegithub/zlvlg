define(["require", "exports", "../../../utils/globals/IoC", "../../../utils/globals/Constants"], function (require, exports, IoC_1, Constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class MapGrid {
        constructor() {
            this.dotMap = [];
            let group = new Phaser.Group(IoC_1.Container.game);
            group.visible = false;
            for (let xCoordinate = Constants_1.Constants.mapOffset.x; xCoordinate <= Constants_1.Constants.mapWidth; xCoordinate += 32) {
                let graph = new Phaser.Graphics(IoC_1.Container.game, xCoordinate, Constants_1.Constants.mapOffset.y);
                this.dotMap.push({
                    x: xCoordinate,
                    y: Constants_1.Constants.mapOffset.y
                });
                graph.lineStyle(1, 0xd3d3d3, 1);
                graph.moveTo(xCoordinate, Constants_1.Constants.mapOffset.y);
                graph.lineTo(xCoordinate, Constants_1.Constants.mapHeight);
                let line = new Phaser.Sprite(IoC_1.Container.game, xCoordinate, Constants_1.Constants.mapOffset.y, graph.generateTexture());
                group.add(line);
            }
            for (let yCoordinate = Constants_1.Constants.mapOffset.y; yCoordinate <= Constants_1.Constants.mapHeight; yCoordinate += 32) {
                let graph = new Phaser.Graphics(IoC_1.Container.game, Constants_1.Constants.mapOffset.x, yCoordinate);
                this.dotMap.push({
                    x: Constants_1.Constants.mapOffset.x,
                    y: yCoordinate
                });
                graph.lineStyle(1, 0xd3d3d3, 1);
                graph.moveTo(Constants_1.Constants.mapOffset.x, yCoordinate);
                graph.lineTo(Constants_1.Constants.mapWidth - Constants_1.Constants.mapOffset.x, yCoordinate);
                let line = new Phaser.Sprite(IoC_1.Container.game, Constants_1.Constants.mapOffset.x, yCoordinate, graph.generateTexture());
                group.add(line);
            }
            group.visible = true;
            this.sprite = new Phaser.Sprite(IoC_1.Container.game, Constants_1.Constants.mapOffset.x, Constants_1.Constants.mapOffset.y, group.generateTexture());
            this.sprite.inputEnabled = true;
            this.sprite.visible = false;
            group.destroy(true);
        }
    }
    exports.MapGrid = MapGrid;
});
