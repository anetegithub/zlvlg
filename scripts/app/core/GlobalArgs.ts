import { ICursor } from "../../ui/interfaces/ICursor";
import { IMenu } from "../../ui/interfaces/IMenu";
import { ISceneManager } from "../../scene/interfaces/ISceneManager";

export class GlobalArgs {
    cursor?: ICursor;
    menu: IMenu;
    sceneMgr: ISceneManager;
}