define(["require", "exports", "../../utils/globals/IoC", "./parts/MapGrid", "./parts/PreviewPanel", "./parts/SectionBuilder", "./parts/Map"], function (require, exports, IoC_1, MapGrid_1, PreviewPanel_1, SectionBuilder_1, Map_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class MapEditor {
        constructor() {
            this.map = new Map_1.Map(IoC_1.Container.game);
        }
        spriteSections(section) {
            let group = new Phaser.Group(IoC_1.Container.game);
            var sprites = SectionBuilder_1.SectionBuilder.getSection(section);
            sprites.forEach(x => this.bindActions(x));
            sprites.forEach(x => group.add(x));
            return group;
        }
        export() {
            this.map.export();
        }
        get previewPanel() {
            if (!this._previewPanel) {
                this._previewPanel = new PreviewPanel_1.PreviewPanel();
                this._previewPanel.events.onPreview.add(() => {
                    this.mapGrid.sprite.visible = true;
                });
                this._previewPanel.events.onCancel.add(() => {
                    this.mapGrid.sprite.visible = false;
                });
            }
            return this._previewPanel;
        }
        get mapGrid() {
            if (!this._mapGrid) {
                this._mapGrid = new MapGrid_1.MapGrid();
                this._mapGrid.sprite.events.onInputDown.add(() => {
                    this.map.setSprite(this.previewPanel.PreviewSprite);
                });
            }
            return this._mapGrid;
        }
        bindActions(sprite) {
            sprite.events.onInputDown.add(x => {
                this.previewPanel.setPreview(sprite);
            });
        }
    }
    exports.MapEditor = MapEditor;
});
