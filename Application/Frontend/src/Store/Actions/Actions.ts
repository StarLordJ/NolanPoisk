import { MoviesActions } from "./movies";
import { RatingActions } from "./rating";
import { ReviewsActions } from "./reviews";
import { UserActions } from "./users";

export type Actions = MoviesActions & RatingActions & ReviewsActions & UserActions;
