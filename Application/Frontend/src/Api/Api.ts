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
        const response = await axios.get(`/api/rating?name=${encodeURIComponent(movie)}&email=${encodeURIComponent(email)}`);
        return response.data;
    } catch (e) {
        throw Error(e);
    }
}

export async function getMovieRating(movie: string): Promise<{ rating: number; count: number }> {
    try {
        const response = await axios.get(`api/ratingOf?name=${encodeURIComponent(movie)}`);
        return response.data;
    } catch (e) {
        throw Error(e);
    }
}

export async function setUserRating(rate: number, movie: string, email: string): Promise<void> {
    try {
        await axios.post("/api/rating", { rate, movie, email })
    } catch (e) {
        throw Error(e);
    }
}

export async function deleteUserRating(movie: string, email: string): Promise<void> {
    try {
        await axios.post("api/deleteUserRating", { movie, email })
    } catch (e) {
        throw Error(e)
    }
}

export async function sendFilmReview(user: User, movie: string, text: string, isEditing: boolean = false): Promise<void> {
    try {
        await axios.post("/api/review", {
            movie: movie,
            text: text,
            username: user.name,
            email: user.email,
            isEditing
        })
    } catch (e) {
        throw Error(e);
    }
}

export async function deleteReview(movie: string, user: User): Promise<void> {
    try {
        await axios.post("/api/deleteReview", {
            movie,
            email: user.email,
        })
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
