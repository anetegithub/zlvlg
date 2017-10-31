define(["require", "exports", "../../../utils/globals/IoC", "../../../utils/globals/Constants"], function (require, exports, IoC_1, Constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Map extends Phaser.Group {
        constructor() {
            super(...arguments);
            this.sprites = [];
        }
        export() {
            let map = this.sprites.map(val => {
                return {
                    pos: val.pos,
                    tile: val.tile
                };
            });
            var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(map));
            var dlAnchorElem = document.createElement('a');
            dlAnchorElem.setAttribute("href", dataStr);
            dlAnchorElem.setAttribute("download", "scene.json");
            dlAnchorElem.click();
        }
        setSprite(value) {
            let x = this.getPointX(value.pointer.x || IoC_1.Container.game.input.mouse.event.layerX);
            let y = this.getPointY(value.pointer.y || IoC_1.Container.game.input.mouse.event.layerY);
            if (!this.isCompatible(x, y) || this.isDublicate(x, y, value.frame)) {
                return;
            }
            let spriteInMap = new Phaser.Sprite(IoC_1.Container.game, x - Constants_1.Constants.mapOffset.x + 1, y + 9, value.sprite.generateTexture());
            spriteInMap.scale.x = 2;
            spriteInMap.scale.y = 2;
            spriteInMap = IoC_1.Container.game.add.existing(spriteInMap);
            this.sprites.push({
                tile: value.frame,
                pos: {
                    x: x,
                    y: y
                },
                sprite: spriteInMap
            });
        }
        setDelete(pointer, value) {
            let x = this.getPointX(pointer.x || IoC_1.Container.game.input.mouse.event.layerX);
            let y = this.getPointY(pointer.y || IoC_1.Container.game.input.mouse.event.layerY);
            if (!this.isCompatible(x, y)) {
                return;
            }
            let existed = this.sprites.filter(block => block.pos.x == x && block.pos.y == y);
            if (existed.length > 0) {
                existed.forEach(key => {
                    key.sprite.alpha = 0;
                    key.sprite.visible = false;
                });
                this.sprites = this.sprites.filter(function (item) {
                    return existed.indexOf(item) === -1;
                });
            }
        }
        isDublicate(x, y, frame) {
            return this.sprites.filter(block => block.pos.x == x && block.pos.y == y && block.tile == frame).length > 0;
        }
        isCompatible(x, y) {
            if (x > Constants_1.Constants.mapWidth - 32 || y > Constants_1.Constants.mapHeight - 16) {
                return false;
            }
            if (x < Constants_1.Constants.mapOffset.x || y < Constants_1.Constants.mapOffset.y - 32) {
                return false;
            }
            return true;
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
    exports.Map = Map;
});
