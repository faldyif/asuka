const forEach = require('async-foreach').forEach;

export type Pair<T, T2> = {
    key: T,
    value?: T2,
}
export type Arguments = {
    defaultArg?: any,
    additionalArgs: Pair<string, string>[],
}

export default class Parser {
    parseArgs(args?: string[]) : Arguments {
        const result: Arguments = { additionalArgs: [] };
        if (args === undefined || args === null) return { additionalArgs: [] };
        for (let index = 0; index < args.length; index++) {
            const item = args[index];
            if (index === 0 && !item.startsWith('-')) {
                result.defaultArg = item;
            } else if (item.startsWith('-')) {
                const arg: Pair<string, string> = { key: item.substr(1) };
                if (index + 1 < args.length && !args[index + 1].startsWith('-')) {
                    arg.value = args[index + 1];
                }
                result.additionalArgs.push(arg);
            }
        }

        return result;
    }
}
