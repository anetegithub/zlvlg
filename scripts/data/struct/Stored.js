define(["require", "exports", "../GameStorage"], function (require, exports, GameStorage_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class StoredEntity {
    }
    exports.StoredEntity = StoredEntity;
    function Stored(ctor) {
        GameStorage_1.GameStorage.storeNames.push(ctor.constructor.name);
    }
    exports.Stored = Stored;
});
