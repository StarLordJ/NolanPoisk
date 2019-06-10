import { Response } from "express";

import { ResultHandler } from "./requestDecorators";

class EmptyResultHandler implements ResultHandler {
    public async processResult(result: unknown, req: Express.Request, res: Response): Promise<void> {
        res.end();
    }
}

class JsonResultHandler implements ResultHandler {
    public async processResult(result: unknown, req: Express.Request, res: Response): Promise<void> {
        res.json(result);
    }
}

class PlainTextResultHandler implements ResultHandler {
    public async processResult(result: string, req: Express.Request, res: Response): Promise<void> {
        res.send(result.trim());
    }
}

export const httpReturn = {
    Void: new EmptyResultHandler(),
    Json: new JsonResultHandler(),
    PlainText: new PlainTextResultHandler(),
}
