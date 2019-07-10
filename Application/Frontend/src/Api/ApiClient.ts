import { Movie } from "components/MovieItem/MovieItem";
import { Review } from "components/MoviePage/ReviewItem"
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { User } from 'components/Types';

interface QueryParams {
    [key: string]: string;
}

interface QueryOptions {
    params?: QueryParams;
    config?: AxiosRequestConfig;
}

export class ApiClient {
    private user: User | null = null;

    public getAllMovies = async (): Promise<Movie[]> => {
        return await this.get<Movie[]>("/api/movies");
    };

    public getMovieInfo = async (movie: string): Promise<Movie> => {
        return await this.get<Movie>("/api/movies", { params: { name: movie } });
    };

    public getMovieReviews = async (movie: string): Promise<Review[]> => {
        return await this.get<Review[]>("/api/review", { params: { name: movie } });
    };

    public getMovieRatingOfUser = async (movie: string): Promise<number> => {
        return await this.get<number>("/api/userRating", { params: { name: movie, email: this.user.email } });
    };

    public getMovieRating = async (movie: string): Promise<{ rating: number; count: number }> => {
        return await this.get<{ rating: number; count: number }>("/api/movieRating", { params: { name: movie } });
    };

    public setUserRating = async (mark: number, movie: string): Promise<void> => {
        if (!this.user) {
            throw Error("Авторизуйтесь!");
        }
        await this.post("/api/userRating/set", { rate: mark, movie, email: this.user.email });
    };

    public deleteUserRating = async (movie: string): Promise<void> => {
        if (!this.user) {
            throw Error("Авторизуйтесь!");
        }
        await this.post("/api/userRating/delete", { movie, email: this.user.email });
    };

    public sendMovieReview = async (movie: string, text: string): Promise<void> => {
        if (!this.user) {
            throw Error("Авторизуйтесь!");
        }
        await this.post("/api/review/set", {
            movie: movie,
            text: text,
            username: this.user.name,
            email: this.user.email
        });
    };

    public updateMovieReview = async (id: number, text: string): Promise<void> => {
        await this.post("/api/review/update", { id, text });
    };

    public deleteReview = async (id: number): Promise<void> => {
        await this.post("/api/review/delete", { id });
    };

    public authorizeUser = async (email: string, password: string): Promise<User> => {
        const response = await this.post("/api/login", { email, password });
        const user = { name: response.data.name, privilege: response.data.privilege, email };
        this.user = user;

        localStorage.setItem("JWT", response.data.token);
        return user
    };

    public registerUser = async (name: string, email: string, password: string): Promise<AxiosResponse> => {
        return await this.post("/api/register", { name, email, password });
    };

    public checkUserIsLogin = async (token: string): Promise<User> => {
        const user = await this.get<User>("/api/check", {
            config: {
                headers: { Authorization: `JWT ${token}` }
            }
        });
        this.user = user;

        return user;
    };

    public logOutUser = (): void => {
        localStorage.removeItem("JWT");
        this.user = null;
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

export default new ApiClient();
