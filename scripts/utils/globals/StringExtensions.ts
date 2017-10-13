export class StringExtensions {
    static capitalize(string: string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}