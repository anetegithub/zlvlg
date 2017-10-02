define(["require", "exports", "../abstract/BaseScene", "../../ui/impl/buttons/textbutton/TextButton"], function (require, exports, BaseScene_1, TextButton_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class MainMenuScene extends BaseScene_1.BaseScene {
        constructor() {
            super(...arguments);
            this.resources = [
                this.newGame(),
                this.load()
            ];
            this.name = "MainMenu";
            this.clear = false;
        }
        newGame() {
            var closure = this;
            return new TextButton_1.TextButton({
                fontStyle: this.fontStyle,
                y: 365,
                text: 'New Game',
                events: {
                    over: function () {
                        var fxdStyle = closure.fontStyle;
                        fxdStyle.fill = '#45cc5b';
                        this.setStyle(fxdStyle, true);
                    },
                    out: function () {
                        this.setStyle(closure.fontStyle, true);
                    }
                }
            });
        }
        load() {
            var style = this.fontStyle;
            style.fill = '#929293';
            return new TextButton_1.TextButton({
                fontStyle: style,
                y: 415,
                text: 'Load Game'
            });
        }
        get fontStyle() {
            return {
                font: `bold 24pt TheMinion`,
                fill: "#FFFFFF",
                align: 'center'
            };
        }
    }
    exports.MainMenuScene = MainMenuScene;
});
