import { Movie } from "components/MovieItem/MovieItem";
import { Review } from "components/MoviePage/ReviewItem"
import axios, { AxiosResponse } from "axios";
import { User } from 'index';

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

export async function getMovieRatingOfUser(movie: string, email: string): Promise<number> {
    try {
        const response = await axios.get(`/api/userRating?name=${encodeURIComponent(movie)}&email=${encodeURIComponent(email)}`);
        return response.data;
    } catch (e) {
        throw Error(e);
    }
}

export async function getMovieRating(movie: string): Promise<{ rating: number; count: number }> {
    try {
        const response = await axios.get(`api/movieRating?name=${encodeURIComponent(movie)}`);
        return response.data;
    } catch (e) {
        throw Error(e);
    }
}

export async function setUserRating(rate: number, movie: string, email: string): Promise<void> {
    try {
        await axios.post("/api/userRating/set", { rate, movie, email })
    } catch (e) {
        throw Error(e);
    }
}

export async function deleteUserRating(movie: string, email: string): Promise<void> {
    try {
        await axios.post("api/userRating/delete", { movie, email })
    } catch (e) {
        throw Error(e)
    }
}

export async function sendMovieReview(user: User, movie: string, text: string): Promise<void> {
    try {
        await axios.post("/api/review/set", {
            movie: movie,
            text: text,
            username: user.name,
            email: user.email
        })
    } catch (e) {
        throw Error(e);
    }
}

export async function updateMovieReview(id: number, text: string): Promise<void> {
    try {
        await axios.post("/api/review/update", { id, text });
    } catch (e) {
        throw Error(e);
    }
}

export async function deleteReview(id: number): Promise<void> {
    try {
        await axios.post("/api/review/delete", { id })
    } catch (e) {
        throw Error(e);
    }
}

export async function authorizeUser(email: string, password: string): Promise<void> {
    try {
        const response = await axios.post("/api/login", { email, password });
        localStorage.setItem("JWT", response.data.token);
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

export async function checkUserIsLogin(token: string): Promise<{
    name: string;
    email: string;
    privilege: boolean;
}> {
    try {
        const response = await axios.get("/api/check", {
            headers: { Authorization: `JWT ${token}` }
        });

        return response.data;
    } catch (e) {
        throw Error(e);
    }
}

export function logOutUser(): void {
    localStorage.removeItem("JWT");
}
