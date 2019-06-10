import express, { Express } from "express";
import bodyParser from "body-parser";
import { Server } from "http";
import { ApiController } from "../Controllers/DataBaseApiController";
import { httpSetupAttributeRouting } from "./Helpers/requestDecorators";
import { AuthController } from "../Controllers/AuthController";

export class ExpressWrapper {
    private expressApplication: Express;
    private port: number;
    private serverInstance?: Server;
    private dataBaseController: ApiController;
    private authController: AuthController;

    public constructor(port: number, dataBaseController: ApiController, authController: AuthController) {
        this.port = port;
        this.expressApplication = express();
        this.expressApplication.use(bodyParser.json({
            type: ['application/json', 'text/plain']
        }));
        this.dataBaseController = dataBaseController;
        this.authController = authController;
    }

    public async start(): Promise<void> {
        httpSetupAttributeRouting<ApiController>(this.dataBaseController, this.expressApplication);
        httpSetupAttributeRouting<AuthController>(this.authController, this.expressApplication);

        await this.dataBaseController.setupMiddleware(this.expressApplication);
        this.authController.setupMiddleware(this.expressApplication);

        this.serverInstance = await this.startExpressApplication();

        console.log(`Server side listening on port ${this.port}!`);
    }

    public async stop(): Promise<void> {
        if (this.serverInstance !== undefined) {
            this.serverInstance.close();
        }
    }

    private async startExpressApplication(): Promise<Server> {
        return new Promise<Server>((resolve): void => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-function-return-type
            const result = this.expressApplication.listen(this.port, async () => setTimeout(() => resolve(result), 1));
        })
    }
}
