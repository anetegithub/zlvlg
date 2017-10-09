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
            var assetMap = new Phaser.Sprite(game, 0, 900 - 208, 'asset');
            game.add.existing(assetMap);
        });
    }

    get lines(): ManagedComponent[] {
        this.onBack = () => Container.debug = [];

        let linesArr: ManagedComponent[] = [];

        let xStartFrom = (800 % 41.6) / 2;
        let yStartFrom = (600 % 41.6) / 2;

        for (let index = 0; index < 600 / 41.6; index++) {
            let y = yStartFrom + (index * 41.6);
            let line = new Phaser.Line(xStartFrom, y, 600 - xStartFrom, y);
            Container.debug.push(() => {
                Container.game.debug.geom(line, 'blue');
            });
            //draw horizontal line
        }

        for (var index = 0; index < 800 / 41.6; index++) {
            let x = xStartFrom + (index * 41.6);
            let line = new Phaser.Line(x, yStartFrom, x, 800 - yStartFrom);
            Container.debug.push(() => {
                Container.game.debug.geom(line, 'blue');
            });
            //draw vertical line
        }

        return linesArr;
    }
}