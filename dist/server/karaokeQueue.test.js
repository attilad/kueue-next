"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// karaoke.test.ts
const globals_1 = require("@jest/globals");
const karaokeQueue_1 = require("./karaokeQueue");
(0, globals_1.describe)('Karaoke', () => {
    let karaoke;
    (0, globals_1.beforeEach)(() => {
        karaoke = new karaokeQueue_1.KaraokeQueue();
    });
    (0, globals_1.test)('addSinger and currentSinger', () => {
        karaoke.addSinger('John');
        (0, globals_1.expect)(karaoke.currentSinger()).toBe('John');
    });
    (0, globals_1.test)('addSinger and nextSinger', () => {
        karaoke.addSinger('John');
        karaoke.addSinger('Paul');
        (0, globals_1.expect)(karaoke.nextSinger()).toBe('Paul');
    });
    (0, globals_1.test)('addSinger with non-unique name', () => {
        karaoke.addSinger('John');
        const [success, message] = karaoke.addSinger('John');
        (0, globals_1.expect)(success).toBe(false);
        (0, globals_1.expect)(message).toBe("A singer with the name 'John' already exists.");
    });
    (0, globals_1.test)('showSingers', () => {
        karaoke.addSinger('John');
        karaoke.addSinger('Paul');
        karaoke.addSinger('George');
        karaoke.nextSinger(); // Move to Paul
        (0, globals_1.expect)(karaoke.showSingers()).toEqual(['Paul', 'George', 'John']);
    });
    (0, globals_1.test)('singers loop', () => {
        karaoke.addSinger('John');
        karaoke.addSinger('Paul');
        karaoke.addSinger('George');
        karaoke.nextSinger(); // Move to Paul
        karaoke.nextSinger(); // Move to George
        karaoke.nextSinger(); // Move to back to John
        (0, globals_1.expect)(karaoke.showSingers()).toEqual(['John', 'Paul', 'George']);
    });
    (0, globals_1.test)('nextSinger and addSinger', () => {
        karaoke.addSinger('John');
        karaoke.addSinger('Paul');
        karaoke.addSinger('George');
        karaoke.nextSinger(); // Move to Paul
        karaoke.addSinger('Ringo');
        (0, globals_1.expect)(karaoke.showSingers()).toEqual(['Paul', 'George', 'John', 'Ringo']);
    });
    (0, globals_1.test)('addPrioritySinger', () => {
        karaoke.addSinger('John');
        karaoke.addSinger('Paul');
        karaoke.addSinger('George');
        karaoke.addPrioritySinger('Ringo');
        (0, globals_1.expect)(karaoke.showSingers()).toEqual(['John', 'Paul', 'Ringo', 'George']);
    });
    (0, globals_1.test)('addPrioritySinger with non-unique name', () => {
        karaoke.addSinger('John');
        const [success, message] = karaoke.addPrioritySinger('John');
        (0, globals_1.expect)(success).toBe(false);
        (0, globals_1.expect)(message).toBe("A singer with the name 'John' already exists.");
    });
    (0, globals_1.test)('nextSinger and addPrioritySinger', () => {
        karaoke.addSinger('John');
        karaoke.addSinger('Paul');
        karaoke.addSinger('George');
        karaoke.nextSinger(); // Move to Paul
        karaoke.addPrioritySinger('Ringo');
        (0, globals_1.expect)(karaoke.showSingers()).toEqual(['Paul', 'George', 'Ringo', 'John']);
    });
    (0, globals_1.test)('removeSinger', () => {
        karaoke.addSinger('John');
        karaoke.addSinger('Paul');
        karaoke.addSinger('George');
        const [success, message] = karaoke.removeSinger('Paul');
        (0, globals_1.expect)(success).toBe(true);
        (0, globals_1.expect)(message).toBe("Singer 'Paul' has been removed.");
        (0, globals_1.expect)(karaoke.showSingers()).toEqual(['John', 'George']);
    });
    (0, globals_1.test)('removeSinger with non-existent name', () => {
        karaoke.addSinger('John');
        karaoke.addSinger('Paul');
        karaoke.addSinger('George');
        const [success, message] = karaoke.removeSinger('Ringo');
        (0, globals_1.expect)(success).toBe(false);
        (0, globals_1.expect)(message).toBe("A singer with the name 'Ringo' does not exist.");
        (0, globals_1.expect)(karaoke.showSingers()).toEqual(['John', 'Paul', 'George']);
    });
    (0, globals_1.test)('removeSinger and adjust currentIndex', () => {
        karaoke.addSinger('John');
        karaoke.addSinger('Paul');
        karaoke.addSinger('George');
        karaoke.nextSinger(); // Move to Paul
        karaoke.removeSinger('John');
        (0, globals_1.expect)(karaoke.currentSinger()).toBe('Paul');
        (0, globals_1.expect)(karaoke.showSingers()).toEqual(['Paul', 'George']);
        (0, globals_1.expect)(karaoke.nextSinger()).toBe('George');
        (0, globals_1.expect)(karaoke.showSingers()).toEqual(['George', 'Paul']);
    });
    (0, globals_1.test)('removeSinger when current singer is the last', () => {
        karaoke.addSinger('John');
        karaoke.addSinger('Paul');
        karaoke.addSinger('George');
        karaoke.nextSinger(); // Move to Paul
        karaoke.nextSinger(); // Move to George
        karaoke.removeSinger('George');
        (0, globals_1.expect)(karaoke.currentSinger()).toBe('John');
        (0, globals_1.expect)(karaoke.showSingers()).toEqual(['John', 'Paul']);
        (0, globals_1.expect)(karaoke.nextSinger()).toBe('Paul');
        (0, globals_1.expect)(karaoke.showSingers()).toEqual(['Paul', 'John']);
    });
});
