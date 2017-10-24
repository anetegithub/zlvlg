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
        setSprite(sprite) {
            let x = this.getPointX(IoC_1.Container.game.input.mouse.event.layerX);
            let y = this.getPointY(IoC_1.Container.game.input.mouse.event.layerY);
            console.log(IoC_1.Container.game.input.mouse.event.layerX);
            console.log(Math.floor(IoC_1.Container.game.input.mouse.event.layerX / 32));
            let spriteInMap = new Phaser.Sprite(IoC_1.Container.game, x - Constants_1.Constants.mapOffset.x + 1, y + 9, sprite.generateTexture());
            spriteInMap.scale.x = 2;
            spriteInMap.scale.y = 2;
            IoC_1.Container.game.add.existing(spriteInMap);
        }
        getPointX(num) {
            let decimalNum = num / 32;
            let numParts = this.getDecimalPair(decimalNum);
            return (numParts.int + (numParts.decimal > 0.5 ? 1 : 0)) * 32;
        }
        getPointY(num) {
            let decimalNum = num / 32;
            let numParts = this.getDecimalPair(decimalNum);
            if (numParts.decimal < 0.2) {
                numParts.int -= 1;
            }
            return numParts.int * 32;
        }
        getDecimalPair(num) {
            let parts = num.toString().split('.');
            return {
                int: parseInt(parts[0]),
                decimal: parseFloat(`0.${parts[1]}`)
            };
        }
    }
    exports.MapGrid = MapGrid;
});
