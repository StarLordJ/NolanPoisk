import { updateMovieReview } from "../../../Store/Actions/reviews";
import { connect } from 'react-redux';
import { Store } from 'Store/Store';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';

import { Props, ReviewItem } from "./ReviewItem";

const mapStateToProps = (state: Store) => {
    return {
        user: state.user,
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<Store, null, Action>, ownProps: Pick<Props, "movie" | "review">) => {
    const { movie, review } = ownProps;
    return {
        updateMovieReview: (text: string, cb: (status: boolean) => void) => dispatch(updateMovieReview(movie, review.id, text, cb)),
    }
}

export const ReviewItemContainer = connect(mapStateToProps, mapDispatchToProps)(ReviewItem);
