import { combineReducers } from "redux";
import { user } from "./users";
import { movies } from "./movies";
import { reviews } from "./reviews";
import { ratings } from "./rating";

export const reducers = combineReducers({
    user: user,
    movies: movies,
    reviews: reviews,
    ratings: ratings,
});
