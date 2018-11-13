// MIT © 2018 azu
"use strict";
import { createLocalStorage, LocalStoragePonyfill } from "localstorage-ponyfill";

class Storage {
    private localStorage: LocalStoragePonyfill;

    constructor() {
        this.localStorage = createLocalStorage();
    }

    getItem(name: string, defaultValue?: any) {
        return this.localStorage.getItem(name) || defaultValue;
    }

    setItem(name: string, value: any) {
        return this.localStorage.setItem(name, value);
    }

    removeItem(name: string) {
        return this.localStorage.removeItem(name);
    }
}

export const storage = new Storage();
