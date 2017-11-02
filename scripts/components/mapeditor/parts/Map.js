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
        import() {
            let thisMap = this;
            let fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.onchange = function () {
                var files = fileInput.files;
                console.log(files);
                if (files.length <= 0) {
                    return false;
                }
                var fr = new FileReader();
                fr.onload = function (e) {
                    var result = JSON.parse(e.target.result);
                    thisMap.restoreMap(result);
                };
                fr.readAsText(files.item(0));
            };
            fileInput.click();
        }
        setSprite(value) {
            let x = this.getPointX(value.pointer.x || IoC_1.Container.game.input.mouse.event.layerX);
            let y = this.getPointY(value.pointer.y || IoC_1.Container.game.input.mouse.event.layerY);
            if (!this.isCompatible(x, y, { h: value.sprite.height, w: value.sprite.width }) || this.isDublicate(x, y, value.frame)) {
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
                    y: y,
                    z: this.setZIndex(x, y)
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
            let existed = this.sprites.filter(block => block.pos.x == x && block.pos.y == y)
                .sort(x => x.pos.z);
            existed = existed.filter(x => x.pos.z == Math.max.apply(Math, existed.map(ex => ex.pos.z)));
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
        restoreMap(value) {
            let sortedByZ = value.sort(x => x.pos.z);
            sortedByZ.forEach(block => {
                let spriteInMap = new Phaser.Sprite(IoC_1.Container.game, block.pos.x - Constants_1.Constants.mapOffset.x + 1, block.pos.y + 9, 'sprites', block.tile);
                spriteInMap.scale.x = 2;
                spriteInMap.scale.y = 2;
                spriteInMap = IoC_1.Container.game.add.existing(spriteInMap);
                block.sprite = spriteInMap;
                block.tile = spriteInMap.frameName;
            });
            this.sprites = sortedByZ;
        }
        setZIndex(x, y) {
            return this.sprites.filter(block => block.pos.x == x && block.pos.y == y).length;
        }
        isDublicate(x, y, frame) {
            return this.sprites.filter(block => block.pos.x == x && block.pos.y == y && block.tile == frame).length > 0;
        }
        isCompatible(x, y, size) {
            if (x > Constants_1.Constants.mapWidth - 32 || y > Constants_1.Constants.mapHeight - 16) {
                return false;
            }
            if (x < Constants_1.Constants.mapOffset.x || y < Constants_1.Constants.mapOffset.y - 32) {
                return false;
            }
            if (size) {
                if (size.h > 16) {
                    y += (size.h - 16) * 2;
                }
                if (size.w > 16) {
                    x += (size.w - 16) * 2;
                }
                return true && this.isCompatible(x, y);
            }
            else {
                return true;
            }
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
