import { getMovieReviews, deleteMovieReview } from "../../../Store/Actions/reviews";
import { connect } from 'react-redux';
import { Props, Reviews } from "./Reviews";
import { Store } from 'Store/Store';
import { ThunkDispatch } from 'redux-thunk';
import { Actions } from 'Store/Actions/Actions';

type OwnProps = Pick<Props, "movie">;
type MappedStateProps = Pick<Props, "reviews">;
type MappedDispatchProps = Pick<Props, "getMovieReviews" | "deleteReview">;

const mapStateToProps = (state: Store, ownProps: OwnProps): MappedStateProps => {
    const { movie } = ownProps;
    const reviews = state.reviews[movie];

    return { reviews };
}

const mapDispatchToProps = (dispatch: ThunkDispatch<Store, null, Actions>, ownProps: OwnProps): MappedDispatchProps => {
    const { movie } = ownProps;

    return {
        getMovieReviews: () => dispatch(getMovieReviews(movie)),
        deleteReview: (id: number) => dispatch(deleteMovieReview(movie, id)),
    }
}

export const ReviewsContainer = connect(mapStateToProps, mapDispatchToProps)(Reviews);
