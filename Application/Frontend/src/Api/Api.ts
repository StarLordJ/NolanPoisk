import { Movie } from "components/MovieItem/MovieItem";
import { Review } from "components/MoviePage/ReviewItem"
import axios, {AxiosRequestConfig } from "axios";
import { User } from 'index';

interface QueryParams {
    [key: string]: string;
}

interface QueryOptions {
    params?: QueryParams;
    config?: AxiosRequestConfig;
}

export class ApiClient {
    private _user: User;

    public getAllMovies = async (): Promise<Movie[]> => {
        return await this.get<Movie[]>("/api/movies");
    };

    public set user(user: User) {
        this._user = user;
    }

    public getMovieInfo = async (movie: string): Promise<Movie> => {
        return await this.get<Movie>("/api/movies", { params: { name: movie }});
    };

    public getMovieReviews = async (movie: string): Promise<Review[]> => {
        return await this.get<Review[]>("/api/review", { params: { name: movie }});
    };

    public getMovieRatingOfUser = async (movie: string, email: string): Promise<number> => {
        return await this.get<number>("/api/userRating", { params: { name: movie, email }});
    };

    public getMovieRating = async (movie: string): Promise<{ rating: number; count: number }> => {
        return await this.get<{ rating: number; count: number }>("/api/movieRating", { params: { name: movie }});
    };

    public setUserRating = async (mark: number, movie: string, email: string): Promise<void> => {
        await this.post("/api/userRating/set", { rate: mark, movie, email });
    };

    public deleteUserRating = async (movie: string, email: string): Promise<void> => {
        await this.post("/api/userRating/delete", { movie, email });
    };

    public sendMovieReview = async (user: User, movie: string, text: string): Promise<void> => {
        await this.post("/api/review/set", {
            movie: movie,
            text: text,
            username: user.name,
            email: user.email
        });
    };

    public updateMovieReview = async (id: number, text: string): Promise<void> => {
        await this.post("/api/review/update", { id, text });
    };

    public deleteReview = async (id: number): Promise<void> => {
        await this.post("/api/review/delete", { id });
    };

    public authorizeUser = async (email: string, password: string): Promise<void> => {
        const response = await this.post("/api/login", { email, password });
        localStorage.setItem("JWT", response.data.token);
    };

    public registerUser = async (name: string, email: string, password: string): Promise<void> => {
        await this.post("/api/register", { name, email, password });
    };

    public checkUserIsLogin = async (token: string): Promise<{
        name: string;
        email: string;
        privilege: boolean;
    }> => {
        return  await this.get<{
            name: string;
            email: string;
            privilege: boolean;
        }>("/api/check", {
            config: {
                headers: { Authorization: `JWT ${token}` }
            }
        });
    };

    public logOutUser = (): void => {
        localStorage.removeItem("JWT");
    };

    private async get<T>(url: string, options: QueryOptions = {}): Promise<T> {
        try {
            const response = await axios.get(this.buildQueryString(url, options.params), options.config);
            return response.data;
        } catch (e) {
            throw Error(e);
        }
    };

    private async post(url: string, data?: any): Promise<any> {
        try {
            return await axios.post(url, data);
        } catch (e) {
            throw Error(e);
        }
}

    private buildQueryString(url: string, params?: QueryParams) {
        let queryString = url;

        if (params) {
            queryString += "?";

            for (const [name, value] of Object.entries(params)) {
                const pair = name + encodeURIComponent(value) + "&";
                queryString += pair;
            }
        }

        return queryString;
    }
}
