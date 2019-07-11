import ApiClient from "../../Api/ApiClient";
import { Dispatch } from 'redux';

export enum Actions {
    SEND_MOVIE_REVIEW = "SEND_MOVIE_REVIEW",
    GET_MOVIE_REVIEWS = "GET_MOVIE_REVIEWS",
    DELETE_MOVIE_REVIEW = "DELETE_MOVIE_REVIEW",
    UPDATE_MOVIE_REVIEW = "UPDATE_MOVIE_REVIEW"
}

export function sendMovieReview(name: string, text: string, cb: (status: boolean) => void) {
    return async (dispatch: Dispatch) => {
        try {
            const response = await ApiClient.sendMovieReview(name, text);
            if (response.status === 200) {
                const review = { ...JSON.parse(response.config.data), id: response.data, isApproved: false };
                dispatch({ type: Actions.SEND_MOVIE_REVIEW, data: { movie: name, reviews: [review] } });
                cb(true);
            } else {
                cb(false);
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export function getMovieReviews(name: string) {
    return async (dispatch: Dispatch) => {
        try {
            const response = await ApiClient.getMovieReviews(name);
            dispatch({ type: Actions.GET_MOVIE_REVIEWS, data: { movie: name, reviews: response } });
        } catch (e) {
            console.log(e);
        }
    }
}

export function deleteMovieReview(name: string, id: number) {
    return async (dispatch: Dispatch) => {
        try {
            const response = await ApiClient.deleteReview(id);
            if (response.status === 200) {
                dispatch({ type: Actions.DELETE_MOVIE_REVIEW, data: { movie: name, id } });
            } else { "soso" };
        } catch (e) {
            console.log(e);
        }
    }
}

export function updateMovieReview(name: string, id: number, text: string, cb: (status: boolean) => void) {
    return async (dispatch: Dispatch) => {
        try {
            const response = await ApiClient.updateMovieReview(id, text);
            if (response.status === 200) {
                dispatch({ type: Actions.UPDATE_MOVIE_REVIEW, data: { movie: name, id, text } });
                cb(true)
            } else {
                cb(false);
            }
        } catch (e) {
            console.log(e);
        }
    }
}
