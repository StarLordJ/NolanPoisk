import { Actions, RatingActions } from "../Actions/rating";

export function ratings(state = {}, action: RatingActions) {
    switch (action.type) {
        case Actions.DELETE_USER_RATING:
        case Actions.GET_MOVIE_RATING:
        case Actions.SET_USER_RATING: {
            const newState = {};
            const { movie, userMark, averageRating } = action.ratingInfo;

            newState[movie] = { userMark, averageRating };

            return { ...state, ...newState };
        }
        default: {
            return state;
        }
    }
}
