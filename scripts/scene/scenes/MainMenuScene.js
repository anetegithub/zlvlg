define(["require", "exports", "../abstract/BaseScene", "../../ui/impl/buttons/textbutton/TextButton", "../../utils/globals/IoC", "../scenes/ui/NicknameInput", "../../ui/impl/Menu"], function (require, exports, BaseScene_1, TextButton_1, IoC_1, NicknameInput_1, Menu_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class MainMenuScene extends BaseScene_1.BaseScene {
        constructor() {
            super(...arguments);
            this.resources = [
                this.newGame(),
                this.load(),
                new Menu_1.MainMenu()
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
                    },
                    down: function () {
                        var fxdStyle = closure.fontStyle;
                        fxdStyle.font = `bold 20pt TheMinion`;
                        fxdStyle.fill = '#45cc5b';
                        this.setStyle(fxdStyle, true);
                    },
                    up: function () {
                        IoC_1.Container.sceneMgr.next(NicknameInput_1.NicknameInput);
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
