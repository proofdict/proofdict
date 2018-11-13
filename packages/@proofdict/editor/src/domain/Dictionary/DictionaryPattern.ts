// MIT © 2017 azu
const PREFIX_BOUNDARY = /(^\/)\\b/;
const POSTFIX_BOUNDARY = /\\b(\/\w*?)$/;
const regexpRegexp = /^\/(.*)\/([gimy]*)$/;

function isRegExpLike(str: string): boolean {
    return regexpRegexp.test(str);
}

function parseRegExpString(str: string): RegExp | string {
    const result = str.match(regexpRegexp);
    if (!result) {
        return str;
    }
    return new RegExp(result[1], result[2]);
}

function concat(args: (string | RegExp)[], flags?: string): RegExp {
    let prevFlags = flags || "";
    let foundRegExp = false;
    const result = args.reduce<string>((p, c) => {
        if (typeof c === "string") {
            return p + c;
        } else if (c instanceof RegExp) {
            c.flags.split("").sort();
            const currentFlags = c.flags
                .split("")
                .sort()
                .join("");
            if (foundRegExp) {
                if (prevFlags !== currentFlags) {
                    throw new Error(`combining different flags ${prevFlags} and ${currentFlags}.
The pattern ${c} has different flag with other patterns.`);
                }
            }
            prevFlags = currentFlags;
            foundRegExp = true;
            return p + c.source;
        } else {
            throw new Error(`unknown type: ${c}`);
        }
    }, "");
    return new RegExp(result, prevFlags);
}

function addBoundary(arg: string): string {
    const inputValue = parseRegExpString(arg);
    if (typeof inputValue === "string") {
        return inputValue;
    }
    const wrappedRegExp = concat(["\\b", inputValue.source, "\\b"], inputValue.flags);
    return wrappedRegExp.toString();
}

export class DictionaryPattern {
    value: string;

    constructor(value: string) {
        this.value = value;
    }

    addWordBoundary() {
        if (this.hasWrappedWordBoundary) {
            return this.value;
        }
        return addBoundary(this.value);
    }

    trimWorkBoundary() {
        if (!this.hasWrappedWordBoundary) {
            return this.value;
        }
        return this.value.replace(PREFIX_BOUNDARY, "$1").replace(POSTFIX_BOUNDARY, "$1");
    }

    get isRegExpLike() {
        return isRegExpLike(this.value);
    }

    /**
     * /\bpattern\b/
     */
    get hasWrappedWordBoundary() {
        return PREFIX_BOUNDARY.test(this.value) && POSTFIX_BOUNDARY.test(this.value);
    }

    equals(pattern: DictionaryPattern) {
        return this.value === pattern.value;
    }
}
