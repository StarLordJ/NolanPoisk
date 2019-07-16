import { Actions, RatingActions } from "../Actions/rating";
import { Store } from 'Store/Store';

export function ratings(state: Store.ratings = {}, action: RatingActions): Store.ratings {
    switch (action.type) {
        case Actions.DELETE_USER_RATING:
        case Actions.GET_MOVIE_RATING:
        case Actions.SET_USER_RATING: {
            const newState: Store.ratings = {};
            const { movie, userMark, averageRating } = action.ratingInfo;

            newState[movie] = { userMark, averageRating };

            return { ...state, ...newState };
        }
        default: {
            return state;
        }
    }
}
