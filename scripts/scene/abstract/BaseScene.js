define(["require", "exports", "../../utils/globals/IoC"], function (require, exports, IoC_1) {
    "use strict";
    exports.__esModule = true;
    var BaseScene = /** @class */ (function () {
        function BaseScene() {
        }
        BaseScene.prototype.run = function () {
            this.resources.forEach(function (resource) { return resource.release(IoC_1.Container.game); });
        };
        return BaseScene;
    }());
    exports.BaseScene = BaseScene;
});
