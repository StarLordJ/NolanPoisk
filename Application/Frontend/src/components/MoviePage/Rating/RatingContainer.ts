import { ThunkDispatch } from 'redux-thunk';
import { Store } from 'Store/Store';
import { Actions } from 'Store/Actions/Actions';
import { connect } from 'react-redux';
import { getMovieRating, setUserRating, deleteUserRating } from "../../../Store/Actions/rating";
import { Rating, Props } from "./Raiting";

type OwnProps = Pick<Props, "movie">;
type MappedStateProps = Pick<Props, "rating" | "user">;
type MappedDispatchProps = Pick<Props, "deleteUserRating" | "setUserRating" | "getMovieRating">;

const mapStateToProps = (state: Store.State, ownProps: OwnProps): MappedStateProps => {
    return {
        rating: state.ratings[ownProps.movie] || { averageRating: { rating: 0, count: 0 }, userMark: 0 },
        user: state.user,
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<Store.State, null, Actions>, ownProps: OwnProps): MappedDispatchProps => {
    return {
        deleteUserRating: () => dispatch(deleteUserRating(ownProps.movie)),
        setUserRating: (mark: number) => dispatch(setUserRating(mark, ownProps.movie)),
        getMovieRating: () => dispatch(getMovieRating(ownProps.movie)),
    }
}

export const RatingContainer = connect(mapStateToProps, mapDispatchToProps)(Rating);
