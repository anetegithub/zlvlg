import { StoredEntity, Stored } from "../struct/Stored";
import { Character } from "../struct/Character";

@Stored
export class GameState extends StoredEntity {
    character: Character;
}