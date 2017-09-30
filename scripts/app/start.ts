import { ZombieHand } from "../ui/impl/ZombieHand";
import { MainMenu } from "../ui/impl/Menu";
import { GlobalArgs } from "./core/GlobalArgs";
import { GlobalGame } from "./core/GlobalGame";
import { ISceneManager } from "../scene/interfaces/ISceneManager";
import { MemorySceneManager } from "../scene/impl/MemorySceneManager";
import { Container } from "../utils/globals/IoC";
import { MainMenuScene } from "../scene/scenes/MainMenuScene";

//comment for intellisence
declare var WebFont: any;

WebFont.load({
    custom: {
        families: ['TheMinion'],
        urls: ['./styles/app.css']
    },
    active: () => {
        var args = new GlobalArgs();
        args.cursor = new ZombieHand();
        args.menu = new MainMenu();

        var game = new GlobalGame(args);
        game.run();

        Container.sceneMgr = new MemorySceneManager();
        Container.sceneMgr.add(new MainMenuScene());
        Container.sceneMgr.next("MainMenu");
    }
});