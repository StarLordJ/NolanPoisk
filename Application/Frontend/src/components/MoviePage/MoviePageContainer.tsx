import { connect } from "react-redux";
import { getMovieFullInfo } from '../../Store/Actions/movies';
import { Store } from 'Store/Store';
import { Actions } from 'Store/Actions/Actions';
import { ThunkDispatch } from 'redux-thunk';
import { MoviePage, Props } from "./MoviePage";

type OwnProps = Pick<Props, "match">;
type MappedStateProps = Pick<Props, "movie" | "user">;
type MappedDispatchProps = Pick<Props, "getMovieInfo">;

const mapStateToProps = (state: Store.State, ownProps: OwnProps): MappedStateProps => {
    const { currentMovie } = state.movies;
    const movieName = ownProps.match.params.name;

    return {
        movie: currentMovie && currentMovie.name === movieName ? currentMovie : undefined,
        user: state.user,
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<Store.State, null, Actions>, ownProps: OwnProps): MappedDispatchProps => {
    return {
        getMovieInfo: () => dispatch(getMovieFullInfo(ownProps.match.params.name)),
    }
}

export const MoviePageContainer = connect(mapStateToProps, mapDispatchToProps)(MoviePage);
