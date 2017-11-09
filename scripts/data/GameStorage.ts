import { Ctr } from "../utils/struct/Ctr";
import { StoredEntity } from "./struct/Stored";

export class GameStorage {
    db: IDBDatabase;

    static storeNames: string[] = [];

    async init(): Promise<void> {
        await new Promise((resolve, reject) => {
            let context = this;
            let request = window.indexedDB.open('mdung', 1);
            request.onsuccess = function (e: any) {
                context.db = e.target.result;
            }
            request.onupgradeneeded = function (e: any) {
                context.db = e.target.result;
                resolve();
            };
        });

        GameStorage.storeNames.forEach(async storeName => {
            await this.createObjectStore(storeName);
        });
    }

    private async createObjectStore(name: string) {
        if (await this.isempty(name)) {
            return new Promise((resolve, reject) => {
                let req = this.db.createObjectStore(name, {
                    keyPath: 'id',
                    autoIncrement: true
                });
                req.transaction.oncomplete = () => resolve();
                req.transaction.onerror = () => resolve();
            });
        }
    }

    async isempty<T>(type: Ctr<T> | string): Promise<boolean> {
        return await this.promisifyTransaction(type, true, "count", "readonly", []);
    }

    async save<T extends StoredEntity>(type: Ctr<T>, value: T): Promise<Boolean> {
        return await this.promisifyTransaction(type, false, value.id == 0 ? "add" : "put", "readwrite", [value]);
    }

    async remove<T extends StoredEntity>(type: Ctr<T>, identifier: number): Promise<Boolean> {
        return await this.promisifyTransaction(type, false, "delete", "readwrite", [identifier]);
    }

    async get<T extends StoredEntity>(type: Ctr<T>, identifier: number): Promise<T> {
        return await this.promisifyTransaction(type, null, "get", "readonly", [identifier]);
    }

    private async promisifyTransaction<T>(type: Function | string, failure: T, method: string, access: IDBTransactionMode, args: any[]) {
        return new Promise<T>((resolve, reject) => {
            try {
                let table = "";
                if (typeof type !== "string") {
                    table = type.constructor.name;
                } else {
                    table = type;
                }
                let req = this.db.transaction(table, access)
                    .objectStore(table)[method](...args);

                req.onsuccess = () => resolve(req.result);
                req.onerror = () => resolve(failure);
            } catch {
                resolve(failure);
            }
        });
    }
}