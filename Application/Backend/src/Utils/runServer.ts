import { ApiController } from "../Server/Controllers/DataBaseApiController";
import { DataBaseStorage } from "../Server/Storage/DataBaseStorage";
import { AuthStorage } from "../Server/Storage/AuthStorage";
import { ExpressWrapper } from "../Server/ExpressWrapper/ExpressWrapper";
import fs from "fs";
import path from "path";
import { Client } from "pg";
import { AuthController } from "../Server/Controllers/AuthController";


export function runServer(): void {
    const connectionString = fs.readFileSync(path.join(__dirname, "DataBaseUrl.txt"), "utf8");
    const dataBaseClient = new Client({ connectionString: connectionString });
    dataBaseClient.connect();

    const dataBaseStorage = new DataBaseStorage(dataBaseClient);
    const authStorage = new AuthStorage(dataBaseClient)
    const dataBaseController = new ApiController(dataBaseStorage);
    const authController = new AuthController(authStorage);
    const server = new ExpressWrapper(Number(process.env.PORT) || 5000, dataBaseController, authController);
    server.start();
}
