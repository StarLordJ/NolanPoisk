import ApiClient from "../../Api/ApiClient";
import { Dispatch } from 'redux';

export enum Actions {
    GET_ALL_MOVIES = "GET_ALL_MOVIES",
    UPDATE_MOVIE_INFO = "UPDATE_MOVIE_INFO"
}

export function getMovies() {
    return async (dispatch: Dispatch) => {
        try {
            const movies = await ApiClient.getAllMovies();
            dispatch({ type: Actions.GET_ALL_MOVIES, movies });
        } catch (e) {
            console.log(e);
        }
    }
}

export function getMovieFullInfo(name: string) {
    return async (dispatch: Dispatch) => {
        try {
            const movie = await ApiClient.getMovieInfo(name);
            dispatch({ type: Actions.UPDATE_MOVIE_INFO, movies: [movie] });
        } catch (e) {
            console.log(e);
        }
    }
}
