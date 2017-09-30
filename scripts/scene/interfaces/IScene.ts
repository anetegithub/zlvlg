interface IScene {
    /**
     * key of this scene to manipulating
     */
    name: string;

    /**
     * is scene need to clean all at back
     */
    clear: boolean;

    /**
     * run this scene
     */
    run(): void;
}