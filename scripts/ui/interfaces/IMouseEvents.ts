interface IMouseEvents<T> {
    over?: (this: T) => void;
    out?: (this: T) => void;
    up?: (this: T) => void;
    down?: (this: T) => void;
}