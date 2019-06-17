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

    @httpPost("/api/review", httpReturn.Void, httpBodyParam("movie", httpType.String), httpBodyParam("text", httpType.String), httpBodyParam("username", httpType.String), httpBodyParam("email", httpType.String))
    public async setReview(movie: string, text: string, userName: string, userEmail: string): Promise<void> {
        await this.storage.setReview(movie, text, userName, userEmail)
    }
}
