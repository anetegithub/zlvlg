define(["require", "exports", "../../utils/globals/Constants", "../../utils/ui/textfactory/TextFactory", "../../utils/globals/IoC"], function (require, exports, Constants_1, TextFactory_1, IoC_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Panel {
        constructor(pos, background, sprite, text) {
            this.sprite = sprite;
            this.text = text;
            this.background = new Phaser.Sprite(IoC_1.Container.game, pos.w, pos.h, Constants_1.Constants.uiAssert, background);
            this.background.inputEnabled = true;
        }
        get width() {
            return this.background.width;
        }
        get height() {
            return this.background.height;
        }
        release(game) {
            const background = this.background;
            let text = TextFactory_1.TextFactory.new({
                text: this.text,
                fontSize: 16,
                y: (background.y + background.height) + 2
            });
            text.x = (background.width - text.width) / 2 + background.x;
            text.inputEnabled = true;
            let group = new Phaser.Group(game);
            group.add(background);
            if (this.sprite) {
                this.sprite.x = background.x + ((background.width - this.sprite.width) / 2);
                this.sprite.y = background.y + ((background.height - this.sprite.height) / 2);
                group.add(this.sprite);
            }
            group.add(text);
            group.onChildInputOver.add(() => IoC_1.Container.setCursor("point"));
            group.onChildInputOut.add(() => IoC_1.Container.setCursor('cursor'));
            group.onChildInputUp.add(() => IoC_1.Container.setCursor('cursor'));
            group.onChildInputDown.add(() => IoC_1.Container.setCursor('cursor'));
            if (this.click) {
                group.onChildInputDown.add(this.click);
            }
            game.add.existing(group);
        }
    }
    exports.Panel = Panel;
});
