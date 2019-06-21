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
    "marks_count": number;
    rating: number;
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
        const queryString = `INSERT INTO "public"."Reviews" VALUES ('${movie}', '${username}', '${text}', FALSE, '${(new Date).toISOString()}', '${userEmail}')`;

        await this.client.query(queryString);
    }

    public async updateReview(movie: string, text: string, username: string, userEmail: string): Promise<void> {
        const queryString = `UPDATE "public"."Reviews" SET review = '${text}', date='${(new Date).toISOString()}' WHERE name='${movie}' AND email='${userEmail}'`;

        await this.client.query(queryString);
    }

    public async deleteReview(movie: string, email: string): Promise<void> {
        const queryString = `DELETE FROM "public"."Reviews" WHERE name='${movie}' AND email='${email}'`;
        await this.client.query(queryString);
    }

    public async getMovieRatingOfUser(movie: string, email: string): Promise<number> {
        const queryString = `SELECT * FROM "public"."Assessments" WHERE name='${movie}' AND user_email='${email}'`;
        const response = await this.client.query(queryString);

        return response.rows[0] ? response.rows[0].mark : 0;
    }

    public async getMovieRating(movie: string): Promise<{ rating: number; count: number }> {
        const queryString = `SELECT rating, marks_count FROM "public"."Movies" WHERE name='${movie}'`;
        const response = await this.client.query(queryString);
        const d = response.rows[0];

        return {
            rating: d.rating,
            count: d.marks_count
        }
    }

    public async setUserRating(rate: string, movie: string, email: string): Promise<void> {
        const queryString = `INSERT INTO "public"."Assessments" VALUES ('${movie}', ${rate}, '${email}', '${movie + email}')
        ON CONFLICT (movie_user) DO UPDATE SET mark='${rate}', name='${movie}' WHERE "public"."Assessments".movie_user='${movie + email}'`;

        await this.client.query(queryString);
    }

    public async deleteUserRating(movie: string, email: string): Promise<void> {
        const queryString = `DELETE FROM "public"."Assessments" WHERE name='${movie}' AND user_email='${email}'`;

        await this.client.query(queryString);
    }

}
