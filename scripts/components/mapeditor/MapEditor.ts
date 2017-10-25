import { Container } from "../../utils/globals/IoC";
import { Constants } from "../../utils/globals/Constants";
import { MapGrid } from "./parts/MapGrid";
import { PreviewPanel } from "./parts/PreviewPanel";
import { SpriteMap } from "../../utils/graphics/SpriteMap";
import { SectionBuilder } from "./parts/SectionBuilder";
import { Map } from "./parts/Map";

export class MapEditor {
    spriteSections(section: keyof SpriteMap): Phaser.Group {
        let group = new Phaser.Group(Container.game);
        var sprites = SectionBuilder.getSection(section);
        sprites.forEach(x => this.bindActions(x));
        sprites.forEach(x => group.add(x));
        return group;
    }

    private map: Map = new Map(Container.game);
    export() {
        this.map.export();
    }

    private _previewPanel: PreviewPanel;
    get previewPanel(): PreviewPanel {
        if (!this._previewPanel) {
            this._previewPanel = new PreviewPanel();
            this._previewPanel.events.onPreview.add(() => {
                this.mapGrid.sprite.visible = true;
            });
            this._previewPanel.events.onCancel.add(() => {
                this.mapGrid.sprite.visible = false;
            })
        }
        return this._previewPanel;
    }

    private _mapGrid: MapGrid;
    get mapGrid(): MapGrid {
        if (!this._mapGrid) {
            this._mapGrid = new MapGrid();
            this._mapGrid.sprite.events.onInputDown.add(() => {
                this.map.setSprite(this.previewPanel.PreviewSprite);
            })
        }

        return this._mapGrid;
    }

    private bindActions(sprite: Phaser.Sprite) {
        sprite.events.onInputDown.add(x => {
            this.previewPanel.setPreview(sprite);
        });
    }
}