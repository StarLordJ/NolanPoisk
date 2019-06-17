import { Client, QueryResult } from "pg";

export interface MovieShortInfo {
    name: string;
    shortDescription: string;
    genre: string[];
    year: number;
    posterUrl: string;
}

export interface MovieFullInfo {
    name: string;
    cast: string[];
    tagline: string;
    description: string;
    trailerUrl: string;
    genre: string[];
    year: number;
    posterUrl: string;
}

export interface MovieReview {
    author: string;
    authorEmail: string;
    date: Date;
    text: string;
    isApproved: boolean;
}

interface DBReview {
    date: Date;
    name: string;
    username: string;
    review: string;
    "is_approved": boolean;
    email: string;
}

interface DataBaseMovie {
    name: string;
    tagline: string;
    "short_description": string;
    "full_description": string;
    genre: string[];
    year: number;
    "actor_cast": string[];
}

interface MovieMedia {
    "poster_url": string;
    "trailer_url": string;
}

export class DataBaseStorage {
    private client: Client;

    public constructor(client: Client) {
        this.client = client;
    }

    public async getAllMoviesFromDataBase(): Promise<MovieShortInfo[]> {
        const queryString = `SELECT * FROM "public"."Movies" INNER JOIN "public"."MovieMedia" ON "public"."Movies".name = "public"."MovieMedia".name`;
        const response: QueryResult = await this.client.query(queryString);

        return response.rows.map((el: DataBaseMovie & MovieMedia): MovieShortInfo => {
            return {
                name: el.name,
                shortDescription: el.short_description,
                genre: el.genre,
                year: el.year,
                posterUrl: el.poster_url
            };
        })
    }

    public async getMovieInfo(name: string): Promise<MovieFullInfo> {
        const queryString = `SELECT * FROM "public"."Movies" INNER JOIN "public"."MovieMedia" ON "public"."Movies".name = "public"."MovieMedia".name WHERE "public"."Movies".name='${name}'`;
        const response: QueryResult = await this.client.query(queryString);
        const resMov = response.rows[0];

        return {
            name: resMov.name,
            tagline: resMov.tagline,
            description: resMov.full_description,
            genre: resMov.genre,
            year: resMov.year,
            cast: resMov.actor_cast,
            posterUrl: resMov.poster_url,
            trailerUrl: resMov.trailer_url,
        };
    }

    public async getMovieReviews(movie: string): Promise<MovieReview[]> {
        const queryString = `SELECT * FROM "public"."Reviews" WHERE name='${movie}'`;
        const response = await this.client.query(queryString);

        return response.rows.map((reviewInfo: DBReview): MovieReview => {
            return {
                author: reviewInfo.username,
                authorEmail: reviewInfo.email,
                text: reviewInfo.review,
                date: reviewInfo.date,
                isApproved: reviewInfo.is_approved,
            }
        });
    }

    public async setReview(movie: string, text: string, username: string, userEmail: string): Promise<void> {
        const queryString = `INSERT INTO "public"."Reviews" VALUES ('${movie}', '${username}', '${text}', FALSE, '${(new Date).toISOString()}', '${userEmail}')`

        await this.client.query(queryString);
    }

}
