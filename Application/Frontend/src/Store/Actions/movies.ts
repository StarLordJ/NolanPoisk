import ApiClient from "../../Api/ApiClient";
import { ThunkDispatch, ThunkAction } from 'redux-thunk';
import { Store } from 'Store/Store';
import { MovieShortInfo, MovieAdditionalInfo } from 'components/Types';

export enum Actions {
    GET_ALL_MOVIES = "GET_ALL_MOVIES",
    UPDATE_MOVIE_INFO = "UPDATE_MOVIE_INFO"
}

export type MoviesActions = { type: Actions.GET_ALL_MOVIES, movies: MovieShortInfo[] } | { type: Actions.UPDATE_MOVIE_INFO, movies: MovieAdditionalInfo[] };

type MyThunkAction<Res> = ThunkAction<Res, Store, null, MoviesActions>;
type MyThunkDispatch = ThunkDispatch<Store, null, MoviesActions>;

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
            dispatch({ type: Actions.UPDATE_MOVIE_INFO, movies: [movie] });
        } catch (e) {
            console.log(e);
        }
    }
}
