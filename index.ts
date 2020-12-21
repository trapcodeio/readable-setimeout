import {IReadableTimeout, timeoutToDate} from "./src/utils";


class ReadableTimeout {
    static debugTimeoutString = false;

    static define(fn: () => any, timeout: IReadableTimeout) {
        return setTimeout(fn, this.ms(timeout));
    }


    static run(fn: () => any, timeout: IReadableTimeout) {
        return this.define(fn, timeout);
    }

    static in(timeout: string, run: () => any) {
        return this.define(run, this.msIn(timeout));
    }

    /**
     * Parse string to milliSeconds
     * @param timeout
     */
    static ms(timeout: IReadableTimeout): number {
        const date = timeoutToDate(timeout);
        const ms = date.getTime() - (new Date()).getTime();

        if (this.debugTimeoutString) {
            console.debug(`DebugTimeoutString:`, {
                timeout,
                ms,
                date: date,
                dateString: date.toLocaleString()
            })
        }

        return ms;
    }

    static msIn(timeout: string){
        return this.ms(`${timeout} from now`.trim());
    }
}

export = ReadableTimeout;