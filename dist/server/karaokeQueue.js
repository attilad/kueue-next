"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KaraokeQueue = void 0;
class KaraokeQueue {
    constructor(broadcaster) {
        this.singers = [];
        this.currentIndex = 0;
        this.singers = [];
        this.currentIndex = 0;
        this.broadcaster = broadcaster;
    }
    reset() {
        var _a;
        this.singers = [];
        this.currentIndex = 0;
        (_a = this.broadcaster) === null || _a === void 0 ? void 0 : _a.broadcastUpdate(this.showSingers());
    }
    addSinger(name) {
        var _a;
        if (this.singers.includes(name)) {
            return [false, `A singer with the name '${name}' already exists.`];
        }
        if (this.currentIndex === 0) {
            this.singers.push(name);
        }
        else {
            const currentSingerName = this.currentSinger();
            const insertIndex = this.currentIndex;
            this.singers.splice(insertIndex, 0, name);
            // Update the currentIndex to point back to the current singer
            this.currentIndex = this.singers.indexOf(currentSingerName);
        }
        (_a = this.broadcaster) === null || _a === void 0 ? void 0 : _a.broadcastUpdate(this.showSingers());
        return [true, `Singer '${name}' has been added.`];
    }
    addPrioritySinger(name) {
        var _a;
        if (this.singers.includes(name)) {
            return [false, `A singer with the name '${name}' already exists.`];
        }
        if (this.singers.length === 0) {
            this.singers.push(name);
        }
        else {
            const currentSingerName = this.currentSinger();
            const insertIndex = (this.currentIndex + 2) % this.singers.length;
            this.singers.splice(insertIndex, 0, name);
            // Update the currentIndex to point back to the current singer
            this.currentIndex = this.singers.indexOf(currentSingerName);
        }
        (_a = this.broadcaster) === null || _a === void 0 ? void 0 : _a.broadcastUpdate(this.showSingers());
        return [true, `Priority singer '${name}' has been added.`];
    }
    currentSinger() {
        return this.singers[this.currentIndex];
    }
    nextSinger() {
        var _a;
        this.currentIndex = (this.currentIndex + 1) % this.singers.length;
        (_a = this.broadcaster) === null || _a === void 0 ? void 0 : _a.broadcastUpdate(this.showSingers());
        return this.currentSinger();
    }
    showSingers() {
        if (this.currentIndex === 0) {
            return this.singers;
        }
        const orderedSingers = this.singers
            .slice(this.currentIndex)
            .concat(this.singers.slice(0, this.currentIndex));
        return orderedSingers;
    }
    removeSinger(name) {
        var _a;
        const index = this.singers.indexOf(name);
        if (index === -1) {
            return [false, `A singer with the name '${name}' does not exist.`];
        }
        this.singers.splice(index, 1);
        if (this.singers.length === 0) {
            this.currentIndex = 0;
        }
        else if (index < this.currentIndex) {
            this.currentIndex--;
        }
        else if (this.currentIndex === index) {
            this.currentIndex %= this.singers.length;
        }
        (_a = this.broadcaster) === null || _a === void 0 ? void 0 : _a.broadcastUpdate(this.showSingers());
        return [true, `Singer '${name}' has been removed.`];
    }
}
exports.KaraokeQueue = KaraokeQueue;
