define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GameStorage {
        async init() {
            await new Promise((resolve, reject) => {
                let context = this;
                let request = window.indexedDB.open('mdung', 1);
                request.onsuccess = function (e) {
                    context.db = e.target.result;
                };
                request.onupgradeneeded = function (e) {
                    context.db = e.target.result;
                    resolve();
                };
            });
            GameStorage.storeNames.forEach(async (storeName) => {
                await this.createObjectStore(storeName);
            });
        }
        async createObjectStore(name) {
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
        async isempty(type) {
            return await this.promisifyTransaction(type, true, "count", "readonly", []);
        }
        async save(type, value) {
            return await this.promisifyTransaction(type, false, value.id == 0 ? "add" : "put", "readwrite", [value]);
        }
        async remove(type, identifier) {
            return await this.promisifyTransaction(type, false, "delete", "readwrite", [identifier]);
        }
        async get(type, identifier) {
            return await this.promisifyTransaction(type, null, "get", "readonly", [identifier]);
        }
        async promisifyTransaction(type, failure, method, access, args) {
            return new Promise((resolve, reject) => {
                try {
                    let table = "";
                    if (typeof type !== "string") {
                        table = type.constructor.name;
                    }
                    else {
                        table = type;
                    }
                    let req = this.db.transaction(table, access)
                        .objectStore(table)[method](...args);
                    req.onsuccess = () => resolve(req.result);
                    req.onerror = () => resolve(failure);
                }
                catch (_a) {
                    resolve(failure);
                }
            });
        }
    }
    GameStorage.storeNames = [];
    exports.GameStorage = GameStorage;
});
