// MIT © 2017 azu

const regexpRegexp = /^\/(.*)\/([gimy]*)$/;

export function concat(args: (string | RegExp)[], flags?: string): RegExp {
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

export function addBoundary(arg: string | RegExp): RegExp {
    let result: string;
    let flags = "";
    if (typeof arg === "string") {
        result = arg;
    } else if (arg instanceof RegExp) {
        result = arg.source;
        flags = arg.flags;
    } else {
        throw new Error(`unknown type: ${arg}`);
    }
    return concat(["\\b", result, "\\b"], flags);
}

export function parseRegExpString(str: string): RegExp | null {
    const result = str.match(regexpRegexp);
    if (!result) {
        return null;
    }
    return new RegExp(result[1], result[2]);
}

export const wrapWordBoundaryToString = (pattern: string): string => {
    const regExp = parseRegExpString(pattern);
    if (regExp === null) {
        return pattern;
    }
    const wrapWordPattern = wrapWordBoundary(regExp);
    return wrapWordPattern.toString();
};
export const wrapWordBoundary = (pattern: string | RegExp) => {
    let result;
    let flags;
    if (typeof pattern === "string") {
        result = pattern;
    } else if (pattern instanceof RegExp) {
        result = pattern.source;
        flags = pattern.flags;
    } else {
        throw new Error(`unknown type: ${pattern}`);
    }
    return concat(["\\b", result, "\\b"], flags);
};

/**
 * input: webkit
 * output: [/-webkit/, /webkit-/]
 * @param pattern
 */
export const createCombinationPatterns = (pattern: string | RegExp): RegExp[] => {
    let result;
    let flags;
    if (typeof pattern === "string") {
        const regExp = parseRegExpString(pattern);
        if (regExp) {
            result = regExp.source;
            flags = regExp.flags;
        } else {
            result = pattern;
        }
    } else if (pattern instanceof RegExp) {
        result = pattern.source;
        flags = pattern.flags;
    } else {
        throw new Error(`unknown type: ${pattern}`);
    }
    return [concat(["-", result], flags), concat([result, "-"], flags)];
};
