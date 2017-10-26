import { Container } from "../../../utils/globals/IoC";
import { Constants } from "../../../utils/globals/Constants";
import { Block } from "../../../map/struct/Block";

export class Map extends Phaser.Group {
    sprites: any[] = [];

    export() {
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.sprites));
        var dlAnchorElem = document.createElement('a');
        dlAnchorElem.setAttribute("href", dataStr);
        dlAnchorElem.setAttribute("download", "scene.json");
        dlAnchorElem.click();
    }

    setSprite(value: { pointer: Phaser.Point, sprite: Phaser.Sprite, frame: string | number }) {
        let x = this.getPointX(value.pointer.x || Container.game.input.mouse.event.layerX);
        let y = this.getPointY(value.pointer.y || Container.game.input.mouse.event.layerY);

        if (x > Constants.mapWidth - 32 || y > Constants.mapHeight - 16) {
            return;
        }
        if (x < Constants.mapOffset.x || y < Constants.mapOffset.y - 32) {
            return;
        }

        let spriteInMap = new Phaser.Sprite(Container.game, x - Constants.mapOffset.x + 1, y + 9, value.sprite.generateTexture());
        spriteInMap.scale.x = 2;
        spriteInMap.scale.y = 2;
        Container.game.add.existing(spriteInMap);

        this.sprites.push({
            tile: value.frame,
        });
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