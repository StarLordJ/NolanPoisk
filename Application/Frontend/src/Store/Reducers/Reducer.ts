import { combineReducers } from "redux";
import { user } from "./users";
import { movies } from "./movies";
import { reviews } from "./reviews";
import { ratings } from "./rating";
import { Store } from 'Store/Store';

export const reducers = combineReducers<Store.State>({
    user: user,
    movies: movies,
    reviews: reviews,
    ratings: ratings,
});
