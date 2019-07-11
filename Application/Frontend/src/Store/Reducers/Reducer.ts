import { combineReducers } from "redux";
import { user } from "./users";
import { movies } from "./movies";
import { reviews } from "./reviews";

export const reducers = combineReducers({
    user: user,
    movies: movies,
    reviews: reviews,
});
