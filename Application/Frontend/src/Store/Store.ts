import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { reducers } from "./Reducers/Reducer";
import { User, Review, RatingInfo } from 'components/Types';
import { Movie } from 'components/MovieItem/MovieItem';

export const store = createStore(reducers, applyMiddleware(thunk));

export interface Store {
    user: User | null,
    movies: Movie[],
    reviews: {
        [movieName: string]: Review[],
    }
    ratings: {
        [movieName: string]: RatingInfo
    }
}
