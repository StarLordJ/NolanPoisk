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

    @httpPost("/api/review/set", httpReturn.Void, httpBodyParam("movie", httpType.String), httpBodyParam("text", httpType.String), httpBodyParam("email", httpType.String))
    public async setReview(movie: string, text: string, userEmail: string): Promise<void> {
        await this.storage.setReview(movie, text, userEmail);
    }

    @httpPost("/api/review/update", httpReturn.Void, httpBodyParam("id", httpType.Number), httpBodyParam("text", httpType.String))
    public async updateReview(id: number, text: string): Promise<void> {
        await this.storage.updateReview(id, text);
    }


    @httpPost("/api/review/delete", httpReturn.Void, httpBodyParam("id", httpType.Number))
    public async deleteReview(id: number): Promise<void> {
        await this.storage.deleteReview(id);
    }

    @httpGet("/api/userRating", httpReturn.Json, httpQueryUrlParam("name", httpType.String), httpQueryUrlParam("email", httpType.String))
    public async getMovieRatingOfUser(movie: string, email: string): Promise<number> {
        return await this.storage.getMovieRatingOfUser(movie, email);
    }

    @httpGet("/api/movieRating", httpReturn.Json, httpQueryUrlParam("name", httpType.String))
    public async getMovieRating(movie: string): Promise<{ rating: number; count: number }> {
        return await this.storage.getMovieRating(movie);
    }

    @httpPost("/api/userRating/set", httpReturn.Void, httpBodyParam("rate", httpType.String), httpBodyParam("movie", httpType.String), httpBodyParam("email", httpType.String))
    public async setUserRating(rate: string, movie: string, email: string): Promise<void> {
        await this.storage.setUserRating(rate, movie, email);
    }

    @httpPost("/api/userRating/delete", httpReturn.Void, httpBodyParam("movie", httpType.String), httpBodyParam("email", httpType.String))
    public async deleteUserRating(movie: string, email: string): Promise<void> {
        await this.storage.deleteUserRating(movie, email);
    }
}
