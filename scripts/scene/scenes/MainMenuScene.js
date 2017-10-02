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
define(["require", "exports", "../abstract/BaseScene", "../../ui/impl/buttons/TextButton"], function (require, exports, BaseScene_1, TextButton_1) {
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
                y: 350,
                text: 'New Game'
            });
        };
        MainMenuScene.prototype.load = function () {
            return new TextButton_1.TextButton({
                size: 24,
                y: 400,
                text: 'Load Game'
            });
        };
        return MainMenuScene;
    }(BaseScene_1.BaseScene));
    exports.MainMenuScene = MainMenuScene;
});
