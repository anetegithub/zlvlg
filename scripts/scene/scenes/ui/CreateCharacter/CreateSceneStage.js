define(["require", "exports", "../../../abstract/BaseBackScene", "../../../../ui/impl/text/ManagedText", "../../../../utils/globals/Constants"], function (require, exports, BaseBackScene_1, ManagedText_1, Constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class CreateSceneStage extends BaseBackScene_1.BaseBackScene {
        constructor(title) {
            super();
            this.titleText = title;
        }
        async components() {
            return [
                ...(await super.components()),
                this.title
            ];
        }
        get title() {
            return new ManagedText_1.ManagedText({
                text: this.titleText,
                y: 200,
                fontStyle: {
                    font: 'bold 32pt ' + Constants_1.Constants.fontFamily,
                    fill: Constants_1.Constants.color,
                    align: 'center'
                }
            });
        }
    }
    exports.CreateSceneStage = CreateSceneStage;
});
