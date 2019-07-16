import { getMovieReviews, deleteMovieReview } from "../../../Store/Actions/reviews";
import { connect } from 'react-redux';
import { Props, Reviews } from "./Reviews";
import { Store } from 'Store/Store';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';

const mapStateToProps = (state: Store, ownProps: Pick<Props, "movie">) => {
    const { movie } = ownProps;
    const reviews = state.reviews[movie];

    return { reviews };
}

const mapDispatchToProps = (dispatch: ThunkDispatch<Store, null, Action>, ownProps: Pick<Props, "movie">) => {
    const { movie } = ownProps;

    return {
        getMovieReviews: () => dispatch(getMovieReviews(movie)),
        deleteReview: (id: number) => dispatch(deleteMovieReview(movie, id)),
    }
}

export const ReviewsContainer = connect(mapStateToProps, mapDispatchToProps)(Reviews);
