var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "../abstract/BaseScene", "../../ui/impl/buttons/textbutton/TextButton"], function (require, exports, BaseScene_1, TextButton_1) {
    "use strict";
    exports.__esModule = true;
    var MainMenuScene = /** @class */ (function (_super) {
        __extends(MainMenuScene, _super);
        function MainMenuScene() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.resources = [
                _this.newGame(),
                _this.load()
            ];
            _this.name = "MainMenu";
            _this.clear = false;
            return _this;
        }
        MainMenuScene.prototype.newGame = function () {
            return new TextButton_1.TextButton({
                size: 24,
                y: 365,
                text: 'New Game',
                events: {
                    over: function () {
                        this.addColor('#45cc5b', this.text.length);
                    },
                    out: function () {
                        this.addColor('#FFFFFF', this.text.length);
                    }
                }
            });
        };
        MainMenuScene.prototype.load = function () {
            return new TextButton_1.TextButton({
                size: 24,
                y: 415,
                text: 'Load Game',
                color: '#929293'
            });
        };
        return MainMenuScene;
    }(BaseScene_1.BaseScene));
    exports.MainMenuScene = MainMenuScene;
});
