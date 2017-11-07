import { Tables } from "./Tables";

export class GameStorage {
    db: IDBDatabase;

    constructor() {
        let context = this;
        let request = window.indexedDB.open('mdung', 1);
        request.onsuccess = function (e: any) {
            context.db = e.target.result;
        }
        request.onupgradeneeded = function (e: any) {
            context.db = e.target.result;
            context.init(Tables.games);
        };
    }

    async isempty(table: Tables): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            try {
                let request = this.db.transaction(table, "readonly")
                    .objectStore(table)
                    .count();

                request.onsuccess = () => resolve(request.result > 0);
                request.onerror = () => resolve(false);
            } catch (DOMException) {
                resolve(false);
            }
        });
    }

    async add<T>(table: Tables, value: T): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            try {
                let request = this.db.transaction(table, "readwrite")
                    .objectStore(table)
                    .add(value);

                request.onsuccess = () => resolve(request.result);
                request.onerror = err => reject(err);
            } catch (DOMException) {
                reject("some error");
            }
        });
    }

    async init(table: Tables): Promise<void> {
        this.db.createObjectStore(table, {
            keyPath: 'Id',
            autoIncrement: true
        });
    }
}