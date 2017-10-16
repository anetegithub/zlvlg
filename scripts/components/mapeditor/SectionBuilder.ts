import { SpriteMap } from "../../utils/graphics/SpriteMap";
import { Container } from "../../utils/globals/IoC";

export class SectionBuilder {
    public static getSection(section: keyof SpriteMap): Phaser.Sprite[] {
        var blocks: Phaser.Sprite[] = [];

        var tileMap = SpriteMap.create(Container.game.cache.getJSON('spritesmap'));
        this.fillBlocks(tileMap, section, blocks);

        return blocks;
    }

    private static fillBlocks(tileMap: SpriteMap, section: keyof SpriteMap, blocks: Phaser.Sprite[]) {
        let rowSwitcher = 0,
            currentX = 0,
            asideMap: number[] = [];

        (tileMap[section] as () => SpriteTile[])().forEach(tile => {
            ({ rowSwitcher, currentX } = this.checkRowOverflow(rowSwitcher, currentX));
            this.addSprite(currentX, asideMap, rowSwitcher, tile, blocks);
            ({ rowSwitcher, currentX } = this.updateState(asideMap, rowSwitcher, tile, currentX));
        });
    }

    private static updateState(asideMap: number[], rowSwitcher: number, tile: SpriteTile, currentX: number) {
        asideMap[rowSwitcher] = (asideMap[rowSwitcher] || 0) + (tile.frame.h * 2);
        currentX += (tile.frame.w * 2);
        rowSwitcher++;
        return { rowSwitcher, currentX };
    }

    private static addSprite(currentX: number, asideMap: number[], rowSwitcher: number, tile: SpriteTile, blocks: Phaser.Sprite[]) {
        let x = currentX + 16,
            y = 650 + (asideMap[rowSwitcher] || 0);

        let sprite = new Phaser.Sprite(Container.game, x, y, "sprites", tile.filename);
        sprite.scale.x = 2;
        sprite.scale.y = 2;
        blocks.push(sprite);
    }

    private static checkRowOverflow(rowSwitcher: number, currentX: number) {
        if (rowSwitcher == 17) {
            rowSwitcher = 0;
            currentX = 0;
        }
        return { rowSwitcher, currentX };
    }
}