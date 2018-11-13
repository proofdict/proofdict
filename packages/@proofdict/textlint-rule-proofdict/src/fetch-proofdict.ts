// MIT © 2018 azu
"use strict";
import { Proofdict } from "@proofdict/tester";

const fetch = require("fetch-ponyfill")().fetch;

function delayPromise(ms: number) {
    return new Promise(function(resolve) {
        setTimeout(resolve, ms);
    });
}

function timeoutPromise(promise: Promise<any>, ms: number) {
    const timeout = delayPromise(ms).then(function() {
        const error = new Error("Operation timed out after " + ms + " ms");
        error.name = "TimeoutError";
        throw error;
    });
    return Promise.race([promise, timeout]);
}

export function fetchProofdict<R = Proofdict>({ URL }: { URL: string }): Promise<R> {
    return timeoutPromise(fetch(URL), 5000).then(res => {
        if (!res.ok) {
            throw Error(`Proofdict is not found: ${URL}`);
        }
        return res.json();
    });
}
