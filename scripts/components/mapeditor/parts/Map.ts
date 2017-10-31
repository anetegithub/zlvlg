import { Container } from "../../../utils/globals/IoC";
import { Constants } from "../../../utils/globals/Constants";
import { Block } from "../../../map/struct/Block";

export class Map extends Phaser.Group {
    sprites: {
        tile: string | number,
        pos: {
            x: number,
            y: number,
            z: number
        },
        sprite: Phaser.Sprite
    }[] = [];

    export() {
        let map = this.sprites.map(val => {
            return {
                pos: val.pos,
                tile: val.tile
            }
        });
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(map));
        var dlAnchorElem = document.createElement('a');
        dlAnchorElem.setAttribute("href", dataStr);
        dlAnchorElem.setAttribute("download", "scene.json");
        dlAnchorElem.click();
    }

    setSprite(value: { pointer: Phaser.Point, sprite: Phaser.Sprite, frame: string | number }) {
        let x = this.getPointX(value.pointer.x || Container.game.input.mouse.event.layerX);
        let y = this.getPointY(value.pointer.y || Container.game.input.mouse.event.layerY);

        if (!this.isCompatible(x, y, { h: value.sprite.height, w: value.sprite.width }) || this.isDublicate(x, y, value.frame)) {
            return;
        }

        let spriteInMap = new Phaser.Sprite(Container.game, x - Constants.mapOffset.x + 1, y + 9, value.sprite.generateTexture());
        spriteInMap.scale.x = 2;
        spriteInMap.scale.y = 2;
        spriteInMap = Container.game.add.existing(spriteInMap);

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

    setDelete(pointer: Phaser.Point, value: Phaser.Sprite) {
        let x = this.getPointX(pointer.x || Container.game.input.mouse.event.layerX);
        let y = this.getPointY(pointer.y || Container.game.input.mouse.event.layerY);

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

    private setZIndex(x, y: number): number {
        return this.sprites.filter(block => block.pos.x == x && block.pos.y == y).length;
    }

    private isDublicate(x: number, y: number, frame: string | number) {
        return this.sprites.filter(block => block.pos.x == x && block.pos.y == y && block.tile == frame).length > 0;
    }

    private isCompatible(x: number, y: number, size?: { h: number, w: number }): boolean {

        if (x > Constants.mapWidth - 32 || y > Constants.mapHeight - 16) {
            return false;
        }

        if (x < Constants.mapOffset.x || y < Constants.mapOffset.y - 32) {
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
        } else {
            return true;
        }
    }

    private getPointX(num: number) {
        let decimalNum = num / 32;
        let numParts = this.getDecimalPair(decimalNum);
        return (numParts.int + (numParts.decimal > 0.5 ? 1 : 0)) * 32;
    }

    private getPointY(num: number) {
        let decimalNum = num / 32;
        let numParts = this.getDecimalPair(decimalNum);
        if (numParts.decimal < 0.2) {
            numParts.int -= 1;
        }
        return numParts.int * 32;
    }

    private getDecimalPair(num: number): {
        int: number,
        decimal: number
    } {
        let parts = num.toString().split('.');
        return {
            int: parseInt(parts[0]),
            decimal: parseFloat(`0.${parts[1]}`)
        };
    }
}