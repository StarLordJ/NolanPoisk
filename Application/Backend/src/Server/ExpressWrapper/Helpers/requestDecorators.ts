import { Express, Request, Response } from "express";

const routesProperty = "__http_routes__";

export interface ResultHandler {
    processResult(result: unknown, req: Request, res: Response): Promise<void>;
}

export interface ParamBinder {
    extractValue(req: Request): unknown;
}

interface RequestHandler {
    (req: Request, res: Response): Promise<void>;
}

function buildHandler(
    instance: any,
    methodName: string | symbol,
    paramConfigs: ParamBinder[],
    resultHandler: ResultHandler
): RequestHandler {
    return async (req, res): Promise<void> => {
        try {
            const params = paramConfigs.map((x): unknown => x.extractValue(req));
            let result = instance[methodName].apply(instance, params);
            if (typeof result.then === "function") {
                result = await result;
            }
            await resultHandler.processResult(result, req, res);
        } catch (e) {
            if (e instanceof Error) {
                res.status(500).send(`${e.message}\n${e.stack}`);
            } else {
                res.status(500).send(`${e}`);
            }
            return;
        }
    };
}

export function httpGet(
    urlPattern: string | RegExp,
    resultHandler: ResultHandler,
    ...paramConfigs: ParamBinder[]
): MethodDecorator {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (instanceClass: any, propertyKey: string | symbol): void => {
        instanceClass[routesProperty] = instanceClass[routesProperty] || [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        function setupBinding(instance: any, expressApp: Express): void {
            expressApp.get(urlPattern, buildHandler(instance, propertyKey, paramConfigs, resultHandler));
        }

        instanceClass[routesProperty].push(setupBinding);
    };
}

export function httpPost(
    urlPattern: string,
    resultHandler: ResultHandler,
    ...paramConfigs: ParamBinder[]
): MethodDecorator {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (instanceClass: any, propertyKey: string | symbol): void => {
        instanceClass[routesProperty] = instanceClass[routesProperty] || [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        function setupBinding(instance: any, expressApp: Express): void {
            expressApp.post(urlPattern, buildHandler(instance, propertyKey, paramConfigs, resultHandler));
        }

        instanceClass[routesProperty].push(setupBinding);
    };
}


export function httpSetupAttributeRouting<T>(instance: T, expressApp: Express): void {
    for (const route of instance[routesProperty] || []) {
        route(instance, expressApp);
    }
}

