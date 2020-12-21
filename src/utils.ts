import chronoNode = require("chrono-node");

export type IReadableTimeout = number | string | Date;

const chronoDatesCache: Record<string, Date> = {}

export function parseTimeoutString(timeout: string) {
    const date = chronoDatesCache[timeout] ? chronoDatesCache[timeout] : chronoNode.parseDate(timeout);

    if (!date) {
        throw new Error("Unable to understand timeout string, try a very understandable string.")
    }

    return date
}

export function timeoutToDate(timeout: IReadableTimeout) {

    let date: Date;
    if (typeof timeout === "number") {
        // get the current date & time
        let dateObj = Date.now();
        dateObj += timeout;
        date = new Date(dateObj);
    } else if (typeof timeout === "string") {
        date = parseTimeoutString(timeout)
    } else if (timeout instanceof Date) {
        date = timeout;
    } else {
        date = undefined as any;
    }

    if (!date) {
        throw new Error(`Invalid timeout: ${timeout}`);
    }

    return date;
}