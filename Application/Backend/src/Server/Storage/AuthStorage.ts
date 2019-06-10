import { Client } from "pg";

interface User {
    name: string;
    password: string;
    email: string;
    privilege: boolean;
}

export class AuthStorage {
    private client: Client;

    public constructor(client: Client) {
        this.client = client;
    }

    public async searchConsumer(email: string): Promise<User> {
        const queryString = `SELECT * FROM "public"."Users" WHERE email='${email}'`;
        const response = await this.client.query(queryString);

        return response.rows[0];
    }

    public async registerUser(user: User): Promise<void> {
        const queryString = `INSERT INTO "public"."Users" VALUES ('${user.name}', '${user.password}', '${user.email}', ${user.privilege})`;

        await this.client.query(queryString);
    }
}
