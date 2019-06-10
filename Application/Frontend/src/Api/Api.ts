import { Movie } from "components/MovieItem/MovieItem";
import { Review } from "components/MoviePage/ReviewItem"
import axios from "axios";

export async function getAllMovies(): Promise<Movie[]> {
    try {
        const response = await axios.get("/api/movies");
        return response.data;
    } catch (e) {
        throw Error(e);
    }
}

export async function getMovieInfo(movie: string): Promise<Movie[]> {
    try {
        const response = await axios.get(`/api/movie?name=${encodeURIComponent(movie)}`);
        return response.data;
    } catch (e) {
        throw Error(e);
    }
}

export async function getMovieReviews(movie: string): Promise<Review[]> {
    try {
        const response = await axios.get(`/api/review?name=${encodeURIComponent(movie)}`);
        return response.data;
    } catch (e) {
        throw Error(e);
    }
}

export async function sendFilmReview(movie: string, text: string): Promise<void> {
    try {
        await axios.post("/api/review", {
            name: movie,
            text: text,
        })
    } catch (e) {
        throw Error(e);
    }
}

export async function authorizeUser(email: string, password: string): Promise<void> {
    try {
        await axios.post("/api/login", { email, password });
    } catch (e) {
        throw Error(e);
    }
}

export async function registerUser(name: string, email: string, password: string): Promise<void> {
    try {
        await axios.post("/api/register", { name, email, password });
    } catch (e) {
        throw Error(e);
    }
}
