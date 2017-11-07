define(["require", "exports", "./Tables"], function (require, exports, Tables_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GameStorage {
        constructor() {
            let context = this;
            let request = window.indexedDB.open('mdung', 1);
            request.onsuccess = function (e) {
                context.db = e.target.result;
            };
            request.onupgradeneeded = function (e) {
                context.db = e.target.result;
                context.init(Tables_1.Tables.games);
            };
        }
        async isempty(table) {
            return new Promise((resolve, reject) => {
                try {
                    let request = this.db.transaction(table, "readonly")
                        .objectStore(table)
                        .count();
                    request.onsuccess = () => resolve(request.result > 0);
                    request.onerror = () => resolve(false);
                }
                catch (DOMException) {
                    resolve(false);
                }
            });
        }
        async add(table, value) {
            return new Promise((resolve, reject) => {
                try {
                    let request = this.db.transaction(table, "readwrite")
                        .objectStore(table)
                        .add(value);
                    request.onsuccess = () => resolve(request.result);
                    request.onerror = err => reject(err);
                }
                catch (DOMException) {
                    reject("some error");
                }
            });
        }
        async init(table) {
            this.db.createObjectStore(table, {
                keyPath: 'Id',
                autoIncrement: true
            });
        }
    }
    exports.GameStorage = GameStorage;
});
