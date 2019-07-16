import { Actions as MoviesActions } from "./movies";
import { Actions as RatingActions } from "./rating";
import { Actions as ReviewsActions } from "./reviews";
import { Actions as UsersActions } from "./users";

export type Actions = MoviesActions & RatingActions & ReviewsActions & UsersActions;
