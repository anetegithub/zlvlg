define(["require", "exports", "../ui/impl/ZombieHand", "./core/GlobalArgs", "./core/GlobalGame", "../utils/globals/IoC", "../scene/scenes/MainMenuScene"], function (require, exports, ZombieHand_1, GlobalArgs_1, GlobalGame_1, IoC_1, MainMenuScene_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    WebFont.load({
        custom: {
            families: ['Ringbear'],
            urls: ['./styles/app.css']
        },
        active: () => {
            var args = new GlobalArgs_1.GlobalArgs();
            args.cursor = new ZombieHand_1.ZombieHand();
            var game = new GlobalGame_1.GlobalGame(args);
            game.inited = () => {
                IoC_1.Container.init();
                new MainMenuScene_1.MainMenuScene().run();
            };
            game.run();
        }
    });
});
