import express, { Express } from "express";
import { DataBaseStorage, MovieShortInfo, MovieFullInfo, MovieReview } from "../Storage/DataBaseStorage";
import { httpGet, httpPost } from "../ExpressWrapper/Helpers/requestDecorators";
import { httpType, httpBodyParam, httpQueryUrlParam } from "../ExpressWrapper/Helpers/Params";
import { httpReturn } from "../ExpressWrapper/Helpers/Results";
import path from "path";

export class ApiController {
    private storage: DataBaseStorage;

    public constructor(storage: DataBaseStorage) {
        this.storage = storage;
    }

    public async setupMiddleware(expressApplication: Express): Promise<void> {
        const pat = __dirname.split("Backend")[0];
        expressApplication.use(express.static(path.join(pat, "Frontend/build")));
    }

    @httpGet("/api/movies", httpReturn.Json)
    public async getAllMovies(): Promise<MovieShortInfo[]> {
        return await this.storage.getAllMoviesFromDataBase();
    }

    @httpGet("/api/movie", httpReturn.Json, httpQueryUrlParam("name", httpType.String))
    public async getMovieInfo(movie: string): Promise<MovieFullInfo> {
        return await this.storage.getMovieInfo(movie);
    }

    @httpGet("/api/review", httpReturn.Json, httpQueryUrlParam("name", httpType.String))
    public async getMovieReviews(movie: string): Promise<MovieReview[]> {
        return await this.storage.getMovieReviews(movie);
    }

    @httpPost("/api/review", httpReturn.Void, httpBodyParam("movie", httpType.String), httpBodyParam("text", httpType.String), httpBodyParam("username", httpType.String), httpBodyParam("email", httpType.String), httpBodyParam("isEditing", httpType.Boolean))
    public async setReview(movie: string, text: string, userName: string, userEmail: string, isEditing: boolean): Promise<void> {
        if (isEditing) {
            await this.storage.updateReview(movie, text, userName, userEmail);
        } else {
            await this.storage.setReview(movie, text, userName, userEmail);
        }
    }

    @httpPost("/api/deleteReview", httpReturn.Void, httpBodyParam("movie", httpType.String), httpBodyParam("email", httpType.String))
    public async deleteReview(movie: string, email: string): Promise<void> {
        await this.storage.deleteReview(movie, email);
    }

    @httpGet("/api/rating", httpReturn.Json, httpQueryUrlParam("name", httpType.String), httpQueryUrlParam("email", httpType.String))
    public async getMovieRatingOfUser(movie: string, email: string): Promise<number> {
        return await this.storage.getMovieRatingOfUser(movie, email);
    }

    @httpGet("/api/ratingOf", httpReturn.Json, httpQueryUrlParam("name", httpType.String))
    public async getMovieRating(movie: string): Promise<{ rating: number; count: number }> {
        return await this.storage.getMovieRating(movie);
    }

    @httpPost("/api/rating", httpReturn.Void, httpBodyParam("rate", httpType.String), httpBodyParam("movie", httpType.String), httpBodyParam("email", httpType.String))
    public async setUserRating(rate: string, movie: string, email: string): Promise<void> {
        await this.storage.setUserRating(rate, movie, email);
    }

    @httpPost("/api/deleteUserRating", httpReturn.Void, httpBodyParam("movie", httpType.String), httpBodyParam("email", httpType.String))
    public async deleteUserRating(movie: string, email: string): Promise<void> {
        await this.storage.deleteUserRating(movie, email);
    }
}
