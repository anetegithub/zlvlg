define(["require", "exports", "../../utils/globals/IoC", "./parts/MapGrid", "./parts/PreviewPanel", "./parts/SectionBuilder"], function (require, exports, IoC_1, MapGrid_1, PreviewPanel_1, SectionBuilder_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class MapEditor {
        spriteSections(section) {
            let group = new Phaser.Group(IoC_1.Container.game);
            var sprites = SectionBuilder_1.SectionBuilder.getSection(section);
            sprites.forEach(x => this.bindActions(x));
            sprites.forEach(x => group.add(x));
            return group;
        }
        get previewPanel() {
            if (!this._previewPanel) {
                this._previewPanel = new PreviewPanel_1.PreviewPanel();
            }
            return this._previewPanel;
        }
        get mapGrid() {
            if (!this._mapGrid) {
                this._mapGrid = new MapGrid_1.MapGrid();
            }
            return this._mapGrid;
        }
        bindActions(sprite) {
            debugger;
            let previewPanel = this.previewPanel;
            sprite.events.onInputDown.add(x => this.previewPanel.setPreview(sprite));
        }
    }
    exports.MapEditor = MapEditor;
});
