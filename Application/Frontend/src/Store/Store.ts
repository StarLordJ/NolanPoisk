import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { reducers } from "./Reducers/Reducer";
import { User, Review, RatingInfo, MoviePageInfo, MovieShortInfo } from 'components/Types';

export const store = createStore(reducers, applyMiddleware(thunk));

export declare module Store {

    export type user = User | null;
    export type movies = { allMovies: MovieShortInfo[], currentMovie?: MoviePageInfo };
    export type reviews = {
        [movieName: string]: Review[],
    };
    export type ratings = {
        [movieName: string]: RatingInfo,
    };

    export type toast = {
        toastText: string[] | [];
    }

    export type State = {
        user: user;
        movies: movies;
        reviews: reviews;
        ratings: ratings;
        toast: toast;
    }
}
