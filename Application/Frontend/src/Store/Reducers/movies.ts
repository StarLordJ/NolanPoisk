import { Actions } from "../Actions/movies";
import { Movie } from 'components/MoviePage/MoviePage';

export function movies(state: Movie[] = [], action: { type: Actions, movies: Movie[] }) {
    switch (action.type) {
        case Actions.GET_ALL_MOVIES:
            if (state.length === 1) {
                const movie = state[0];
                const index = action.movies.findIndex(({ name }: Movie) => name === movie.name);

                return [...action.movies.slice(0, index), { ...movie, ...action.movies[index] }, ...action.movies.slice(index + 1)];
            }
            return action.movies;
        case Actions.UPDATE_MOVIE_INFO:
            const movies = state;

            if (!movies.length) {
                return action.movies;
            }
            const index = state.findIndex(({ name }: Movie) => action.movies[0].name === name)

            return [...state.slice(0, index), { ...action.movies[0], ...state[index] }, ...state.slice(index + 1)];
        default:
            return state;
    }
}
