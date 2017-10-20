import { Container } from "../../utils/globals/IoC";
import { Constants } from "../../utils/globals/Constants";
import { MapGrid } from "./parts/MapGrid";
import { PreviewPanel } from "./parts/PreviewPanel";
import { SpriteMap } from "../../utils/graphics/SpriteMap";
import { SectionBuilder } from "./parts/SectionBuilder";

export class MapEditor {

    spriteSections(section: keyof SpriteMap): Phaser.Group {
        let group = new Phaser.Group(Container.game);
        var sprites = SectionBuilder.getSection(section);
        sprites.forEach(x => this.bindActions(x));
        sprites.forEach(x => group.add(x));
        return group;
    }

    private _previewPanel: PreviewPanel;
    get previewPanel(): PreviewPanel {
        if (!this._previewPanel) {
            this._previewPanel = new PreviewPanel();
        }
        return this._previewPanel;
    }

    private _mapGrid: MapGrid;
    get mapGrid(): MapGrid {
        if (!this._mapGrid) {
            this._mapGrid = new MapGrid();
        }

        return this._mapGrid;
    }

    private bindActions(sprite: Phaser.Sprite) {
        debugger;
        let previewPanel = this.previewPanel;
        sprite.events.onInputDown.add(x => this.previewPanel.setPreview(sprite));
    }
}