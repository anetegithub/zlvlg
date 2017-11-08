export function enumKeys(_enum: any): string[] {
    return Object.keys(_enum)
        .map(k => _enum[k])
        .filter(v => typeof v !== "number") as string[];
}