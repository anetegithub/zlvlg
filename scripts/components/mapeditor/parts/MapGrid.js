define(["require", "exports", "../../../utils/globals/IoC", "../../../utils/globals/Constants"], function (require, exports, IoC_1, Constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class MapGrid extends Phaser.Group {
        constructor() {
            super(IoC_1.Container.game);
            this.visible = false;
            for (let xCoordinate = Constants_1.Constants.mapOffset.x; xCoordinate <= Constants_1.Constants.mapWidth; xCoordinate += 32) {
                let graph = new Phaser.Graphics(IoC_1.Container.game, xCoordinate, Constants_1.Constants.mapOffset.y);
                graph.lineStyle(1, 0xd3d3d3, 1);
                graph.moveTo(xCoordinate, Constants_1.Constants.mapOffset.y);
                graph.lineTo(xCoordinate, Constants_1.Constants.mapHeight);
                let line = new Phaser.Sprite(IoC_1.Container.game, xCoordinate, Constants_1.Constants.mapOffset.y, graph.generateTexture());
                this.add(line);
            }
            for (let yCoordinate = Constants_1.Constants.mapOffset.y; yCoordinate <= Constants_1.Constants.mapHeight; yCoordinate += 32) {
                let graph = new Phaser.Graphics(IoC_1.Container.game, Constants_1.Constants.mapOffset.x, yCoordinate);
                graph.lineStyle(1, 0xd3d3d3, 1);
                graph.moveTo(Constants_1.Constants.mapOffset.x, yCoordinate);
                graph.lineTo(Constants_1.Constants.mapWidth - Constants_1.Constants.mapOffset.x, yCoordinate);
                let line = new Phaser.Sprite(IoC_1.Container.game, Constants_1.Constants.mapOffset.x, yCoordinate, graph.generateTexture());
                this.add(line);
            }
        }
    }
    exports.MapGrid = MapGrid;
});
