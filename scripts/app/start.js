define(["require", "exports", "../ui/impl/ZombieHand", "../ui/impl/Menu", "./core/GlobalArgs", "./core/GlobalGame", "../utils/globals/IoC", "../scene/scenes/MainMenuScene"], function (require, exports, ZombieHand_1, Menu_1, GlobalArgs_1, GlobalGame_1, IoC_1, MainMenuScene_1) {
    "use strict";
    exports.__esModule = true;
    WebFont.load({
        custom: {
            families: ['TheMinion'],
            urls: ['./styles/app.css']
        },
        active: function () {
            var args = new GlobalArgs_1.GlobalArgs();
            args.cursor = new ZombieHand_1.ZombieHand();
            args.menu = new Menu_1.MainMenu();
            var game = new GlobalGame_1.GlobalGame(args);
            game.run();
            IoC_1.Container.sceneMgr.add(new MainMenuScene_1.MainMenuScene());
            IoC_1.Container.sceneMgr.next("MainMenu");
        }
    });
});
