import { updateMovieReview } from "../../../Store/Actions/reviews";
import { connect } from 'react-redux';
import { Store } from 'Store/Store';
import { ThunkDispatch } from 'redux-thunk';
import { Actions } from 'Store/Actions/Actions';

import { ReviewItem, Props } from "./ReviewItem";

type OwnProps = Pick<Props, "movie" | "review" | "onDelete">;
type MappedStateProps = Pick<Props, "user">;
type MappedDispatchProps = Pick<Props, "updateMovieReview">;

const mapStateToProps = (state: Store): MappedStateProps => {
    return {
        user: state.user,
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<Store, null, Actions>, ownProps: OwnProps): MappedDispatchProps => {
    const { movie, review } = ownProps;

    return {
        updateMovieReview: (text: string, cb: (status: boolean) => void) => dispatch(updateMovieReview(movie, review.id, text, cb)),
    }
}

export const ReviewItemContainer = connect(mapStateToProps, mapDispatchToProps)(ReviewItem);
