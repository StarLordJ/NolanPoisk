import ApiClient from "../../Api/ApiClient";
import { ThunkDispatch, ThunkAction } from 'redux-thunk';
import { Store } from 'Store/Store';
import { openToast, ToastActions } from "./toast";

export enum Actions {
    SET_USER_RATING = "SET_USER_RATING",
    DELETE_USER_RATING = "DELETE_USER_RATING",
    GET_MOVIE_RATING = "GET_MOVIE_RATING"
}

export type RatingActions =
    { type: Actions.GET_MOVIE_RATING, ratingInfo: { movie: string, userMark: number, averageRating: { rating: number; count: number } } }
    | { type: Actions.DELETE_USER_RATING, ratingInfo: { movie: string, averageRating: { rating: number; count: number }, userMark: number } }
    | { type: Actions.SET_USER_RATING, ratingInfo: { movie: string, averageRating: { rating: number; count: number }, userMark: number } };

type MyThunkAction<Res> = ThunkAction<Res, Store.State, null, RatingActions>;
type MyThunkDispatch = ThunkDispatch<Store.State, null, RatingActions>;

export function getMovieRating(movie: string): MyThunkAction<Promise<void>> {
    return async (dispatch: MyThunkDispatch): Promise<void> => {
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

export function deleteUserRating(movie: string): MyThunkAction<Promise<void>> {
    return async (dispatch: MyThunkDispatch): Promise<void> => {
        try {
            await ApiClient.deleteUserRating(movie);
            try {
                const averageRating = await ApiClient.getMovieRating(movie);
                dispatch({ type: Actions.DELETE_USER_RATING, ratingInfo: { averageRating, movie, userMark: 0 } })
            } catch (er) {
                console.log(er);
            }
        } catch (er) {
            console.log(er);
        }
    }
}

export function setUserRating(mark: number, movie: string): MyThunkAction<Promise<void>> {
    return async (dispatch: MyThunkDispatch): Promise<void> => {
        try {
            await ApiClient.setUserRating(mark, movie);
            try {
                const averageRating = await ApiClient.getMovieRating(movie);
                dispatch({ type: Actions.SET_USER_RATING, ratingInfo: { averageRating, movie, userMark: mark } })
            } catch (er) {
                console.log(er);
            }
        } catch (e) {
            dispatch(openToast(e.data) as unknown as ThunkAction<void, Store.State, null, ToastActions>);
        }
    }
}
