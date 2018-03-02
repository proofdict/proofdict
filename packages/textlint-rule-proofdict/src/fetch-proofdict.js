// MIT © 2018 azu
"use strict";
const fetch = require("fetch-ponyfill")().fetch;
export function fetchProofdict({ URL }) {
    return fetch(URL).then(res => res.json());
}
