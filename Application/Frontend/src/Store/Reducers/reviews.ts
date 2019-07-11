import { Actions } from "../Actions/reviews";
import { Review } from 'components/MoviePage/ReviewItem';

export function reviews(state = {}, action: { type: Actions, data: { movie?: string, reviews?: [], id?: number, text?: string } }) {
    switch (action.type) {
        case Actions.SEND_MOVIE_REVIEW: {
            const oldList = state[action.data.movie] || [];
            const newOb = {};
            newOb[action.data.movie] = [...action.data.reviews, ...oldList];

            return { ...state, ...newOb }
        }
        case Actions.GET_MOVIE_REVIEWS: {
            const newState = {};
            newState[action.data.movie] = action.data.reviews;

            return { ...state, ...newState };
        }
        case Actions.DELETE_MOVIE_REVIEW: {
            const oldList = state[action.data.movie];
            const newList = oldList.filter(({ id }: Review) => id !== action.data.id);
            const newState = {};

            newState[action.data.movie] = newList;

            return { ...state, ...newState }

        }
        case Actions.UPDATE_MOVIE_REVIEW: {
            const oldList = state[action.data.movie];
            const index = oldList.findIndex(({ id }: Review) => id === action.data.id);
            const newState = {};

            newState[action.data.movie] = [...oldList.slice(0, index), { ...oldList[index], text: action.data.text }, ...oldList.slice(index + 1)];

            return { ...state, ...newState }

        }
        default: {
            return state;
        }
    }
}
