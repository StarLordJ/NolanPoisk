import { MoviesActions, Actions } from "../Actions/movies";
import { Store } from 'Store/Store';

export function movies(state: Store.movies = { allMovies: [] }, action: MoviesActions): Store.movies {
    switch (action.type) {
        case Actions.GET_ALL_MOVIES:
            return { ...state, allMovies: action.movies };
        case Actions.GET_MOVIE_FULL_INFO:
            return { ...state, currentMovie: action.movie };
        default:
            return state;
    }
}
