import ApiClient from "../../Api/ApiClient";
import { ThunkDispatch, ThunkAction } from 'redux-thunk';
import { Store } from 'Store/Store';
import { MovieShortInfo, MoviePageInfo } from 'components/Types';

export enum Actions {
    GET_ALL_MOVIES = "GET_ALL_MOVIES",
    GET_MOVIE_FULL_INFO = "GET_MOVIE_FULL_INFO"
}

export type MoviesActions = { type: Actions.GET_ALL_MOVIES, movies: MovieShortInfo[] } | { type: Actions.GET_MOVIE_FULL_INFO, movie: MoviePageInfo };

type MyThunkAction<Res> = ThunkAction<Res, Store.State, null, MoviesActions>;
type MyThunkDispatch = ThunkDispatch<Store.State, null, MoviesActions>;

export function getMovies(): MyThunkAction<Promise<void>> {
    return async (dispatch: MyThunkDispatch): Promise<void> => {
        try {
            const movies = await ApiClient.getAllMovies();
            dispatch({ type: Actions.GET_ALL_MOVIES, movies });
        } catch (e) {
            console.log(e);
        }
    }
}

export function getMovieFullInfo(name: string): MyThunkAction<Promise<void>> {
    return async (dispatch: MyThunkDispatch): Promise<void> => {
        try {
            const movie = await ApiClient.getMovieInfo(name);
            dispatch({ type: Actions.GET_MOVIE_FULL_INFO, movie });
        } catch (e) {
            console.log(e);
        }
    }
}
