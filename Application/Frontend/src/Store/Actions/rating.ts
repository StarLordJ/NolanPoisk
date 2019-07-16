import ApiClient from "../../Api/ApiClient";
import { Dispatch } from 'redux';

export enum Actions {
    SET_USER_RATING = "SET_USER_RATING",
    DELETE_USER_RATING = "DELETE_USER_RATING",
    GET_MOVIE_RATING = "GET_MOVIE_RATING",
}

export function getMovieRating(movie: string) {
    return async (dispatch: Dispatch) => {
        try {
            const averageRating = await ApiClient.getMovieRating(movie);
            try {
                const userRating = await ApiClient.getMovieRatingOfUser(movie);
                dispatch({ type: Actions.GET_MOVIE_RATING, ratingInfo: { averageRating, movie, userMark: userRating } });
            } catch (e) {
                dispatch({ type: Actions.GET_MOVIE_RATING, ratingInfo: { averageRating, movie, userMark: 0 } });
            }
        } catch (e) {
            console.log(e);
        }
    }
}

export function deleteUserRating(movie: string) {
    return async (dispatch: Dispatch) => {
        try {
            await ApiClient.deleteUserRating(movie);
            try {
                const averageRating = await ApiClient.getMovieRating(movie);
                dispatch({ type: Actions.DELETE_USER_RATING, ratingInfo: { averageRating, movie } })
            } catch (er) {
                console.log(er);
            }
        } catch (er) {
            console.log(er);
        }
    }
}

export function setUserRating(mark: number, movie: string) {
    return async (dispatch: Dispatch) => {
        try {
            await ApiClient.setUserRating(mark, movie);
            try {
                const averageRating = await ApiClient.getMovieRating(movie);
                dispatch({ type: Actions.SET_USER_RATING, ratingInfo: { averageRating, movie, userMark: mark } })
            } catch (er) {
                console.log(er);
            }
        } catch (e) {
            console.log(e);
        }
    }
}
