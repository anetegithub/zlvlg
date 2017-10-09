import { BaseBackScene } from "../../abstract/BaseBackScene";
import { MainMenuScene } from "../MainMenuScene";
import { Container } from "../../../utils/globals/IoC";
import { ManagedComponent } from "../../../app/core/impl/ManagedComponent";
import { Constants } from "../../../utils/globals/Constants";

export class EditorMainWindow extends BaseBackScene {
    backScene: new (...args: any[]) => IScene = MainMenuScene;
    name: string = "EditorMainWindow";
    clear: boolean = true;

    protected get components(): IManagedComponent[] {
        return [
            ...super.components,
            this.tilemap,
            ...this.lines
        ]
    }

    protected get resources(): ILoadedResource[] {
        return [
            ...super.resources,
            { key: 'asset', url: './images/environment/assets/dungeon-bicubic.png' }
        ];
    }

    get tilemap(): ManagedComponent {
        return new ManagedComponent(game => {
            var assetMap = new Phaser.Sprite(game, 0, 900 - 208 - 18, 'asset');
            game.add.existing(assetMap);
        });
    }

    get lines(): ManagedComponent[] {
        this.onBack = () => Container.debug = [];

        let linesArr: ManagedComponent[] = [];

        let xStartFrom = 0;
        let yStartFrom = 18;

        for (let i = 0; i < 900 / 48; i++) {
            let y = (i * 48) + yStartFrom;
            let line = new Phaser.Line(xStartFrom, y, 800 - xStartFrom, y);
            Container.debug.push(() => {
                Container.game.debug.geom(line, 'blue');
            });
            //draw horizontal line
        }

        for (let i = 0; i < 800 / 48; i++) {
            let x = (i * 48) + xStartFrom;
            let line = new Phaser.Line(x, yStartFrom, x, 900 - yStartFrom);
            Container.debug.push(() => {
                Container.game.debug.geom(line, 'blue');
            });
            //draw vertical line
        }

        return linesArr;
    }
}