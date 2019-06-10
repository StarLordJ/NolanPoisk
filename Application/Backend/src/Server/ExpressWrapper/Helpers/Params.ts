import { Request } from "express";
import { ParamBinder } from "./requestDecorators"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IValueParser = (value: any) => unknown;

class BodyParamBinder implements ParamBinder {
    private readonly name: string;
    private readonly valueParser: IValueParser;

    public constructor(name: string, valueParser: IValueParser) {
        this.name = name;
        this.valueParser = valueParser;
    }

    public extractValue(req: Request): unknown {
        return this.valueParser(req.body[this.name]);
    }
}

class QueryUrlParamBinder implements ParamBinder {
    private readonly name: string;
    private readonly valueParser: IValueParser;

    public constructor(name: string, valueParser: IValueParser) {
        this.name = name;
        this.valueParser = valueParser;
    }

    public extractValue(req: Request): unknown {
        return this.valueParser(req.query[this.name]);
    }
}

export const httpType = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Number: (x: any): number => parseInt(x, 10),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    String: (x: any): string | undefined => (x == undefined ? undefined : `${x}`),
};


export function httpBodyParam(urlParamName: string, valueParser: IValueParser): ParamBinder {
    return new BodyParamBinder(urlParamName, valueParser);
}

export function httpQueryUrlParam(urlParamName: string, valueParser: IValueParser): ParamBinder {
    return new QueryUrlParamBinder(urlParamName, valueParser);
}
