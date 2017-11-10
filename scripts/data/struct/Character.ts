import { Sex } from "../../game/enums/Sex";
import { Class } from "../../game/enums/Class";
import { Profession } from "../../game/enums/Profession";

export class Character {
    name: string;
    sex: Sex;
    class: Class;
    proffesion: Profession | string;
}