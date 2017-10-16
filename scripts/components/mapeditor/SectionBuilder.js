define(["require", "exports", "../../utils/graphics/SpriteMap", "../../utils/globals/IoC"], function (require, exports, SpriteMap_1, IoC_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SectionBuilder {
        static getSection(section) {
            var blocks = [];
            var tileMap = SpriteMap_1.SpriteMap.create(IoC_1.Container.game.cache.getJSON('spritesmap'));
            this.fillBlocks(tileMap, section, blocks);
            return blocks;
        }
        static fillBlocks(tileMap, section, blocks) {
            let rowSwitcher = 0, currentX = 0, asideMap = [];
            tileMap[section]().forEach(tile => {
                ({ rowSwitcher, currentX } = this.checkRowOverflow(rowSwitcher, currentX));
                this.addSprite(currentX, asideMap, rowSwitcher, tile, blocks);
                ({ rowSwitcher, currentX } = this.updateState(asideMap, rowSwitcher, tile, currentX));
            });
        }
        static updateState(asideMap, rowSwitcher, tile, currentX) {
            asideMap[rowSwitcher] = (asideMap[rowSwitcher] || 0) + (tile.frame.h * 2);
            currentX += (tile.frame.w * 2);
            rowSwitcher++;
            return { rowSwitcher, currentX };
        }
        static addSprite(currentX, asideMap, rowSwitcher, tile, blocks) {
            let x = currentX + 16, y = 650 + (asideMap[rowSwitcher] || 0);
            let sprite = new Phaser.Sprite(IoC_1.Container.game, x, y, "sprites", tile.filename);
            sprite.scale.x = 2;
            sprite.scale.y = 2;
            blocks.push(sprite);
        }
        static checkRowOverflow(rowSwitcher, currentX) {
            if (rowSwitcher == 17) {
                rowSwitcher = 0;
                currentX = 0;
            }
            return { rowSwitcher, currentX };
        }
    }
    exports.SectionBuilder = SectionBuilder;
});
