import { combineReducers } from "redux";
import { user } from "./users";
import { movies } from "./movies";

export const reducers = combineReducers({
    user: user,
    movies: movies,
});
