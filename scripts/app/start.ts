import { ZombieHand } from "../ui/impl/ZombieHand";
import { MainMenu } from "../ui/impl/Menu";
import { GlobalArgs } from "./core/GlobalArgs";
import { GlobalGame } from "./core/GlobalGame";

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
    }
});