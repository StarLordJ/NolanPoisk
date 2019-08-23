import { MoviesActions } from "./movies";
import { RatingActions } from "./rating";
import { ReviewsActions } from "./reviews";
import { UserActions } from "./users";
import { ToastActions } from "./toast";

export type Actions = MoviesActions & RatingActions & ReviewsActions & UserActions & ToastActions;
