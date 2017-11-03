interface IScene {
    /**
     * is scene need to clean all at back
     */
    clear: boolean;

    /**
     * run this scene
     */
    run(): void;
}