define(["require", "exports", "../../../utils/globals/IoC", "../../../utils/globals/Constants"], function (require, exports, IoC_1, Constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class PreviewPanel extends Phaser.Group {
        constructor() {
            super(IoC_1.Container.game);
            this.events = {
                onCancel: new Phaser.Signal(),
                onPreview: new Phaser.Signal()
            };
            this.cancelText = new Phaser.Text(IoC_1.Container.game, 64, 16, "Click mouse right button for cancel", {
                font: `bold 24pt  ` + Constants_1.Constants.fontFamily,
                fill: "#FFFFFF",
                align: 'center'
            });
            this.cancelText.visible = false;
            IoC_1.Container.game.add.existing(this.cancelText);
            this.preview = new Phaser.Sprite(IoC_1.Container.game, 0, 0);
            this.preview.scale.x = 2;
            this.preview.scale.y = 2;
            IoC_1.Container.game.add.existing(this.preview);
            this.makeCancel();
        }
        setPreview(sprite) {
            this.preview.loadTexture(sprite.key, sprite.frame);
            this.preview.visible = true;
            this.preview.bringToTop();
            this.events.onPreview.dispatch();
            IoC_1.Container.game.input.addMoveCallback(this.cursorPreview, this);
            IoC_1.Container.game.input.mousePointer.rightButton.onDown.add(this.makeCancel, this);
        }
        cursorPreview(pointer, x, y, click) {
            this.cancelText.visible = true;
            this.preview.x = IoC_1.Container.game.input.mouse.event.layerX;
            this.preview.y = IoC_1.Container.game.input.mouse.event.layerY;
        }
        get xCoord() {
            return Constants_1.Constants.windowWidth - 100 - Constants_1.Constants.gameWindowOffset.x;
        }
        get yCoord() {
            return Constants_1.Constants.gameWindowOffset.y;
        }
        makeCancel() {
            IoC_1.Container.game.input.deleteMoveCallback(this.cursorPreview, this);
            this.preview.visible = false;
            this.cancelText.visible = false;
            this.events.onCancel.dispatch();
        }
    }
    exports.PreviewPanel = PreviewPanel;
});
