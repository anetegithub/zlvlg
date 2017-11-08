import { Sex } from "../../game/enums/Sex";
import { Class } from "../../game/enums/Class";
import { Profession } from "../../game/enums/Profession";

export class CreateCharacterState {
    name: string;
    sex: Sex;
    class: Class;
    proffesion: Profession;
}