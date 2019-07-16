import { connect } from "react-redux";
import { getMovieFullInfo } from '../../Store/Actions/movies';
import { Store } from 'Store/Store';
import { Actions } from 'Store/Actions/Actions';
import { ThunkDispatch } from 'redux-thunk';
import { MovieShortInfo, MovieAdditionalInfo } from 'components/Types';
import { MoviePage, Props } from "./MoviePage";

type OwnProps = Pick<Props, "match">;
type MappedStateProps = Pick<Props, "movie">;
type MappedDispatchProps = Pick<Props, "getMovieInfo">;

const mapStateToProps = (state: Store, ownProps: OwnProps): MappedStateProps => {
    const movieName = ownProps.match.params.name;
    const movie = state.movies.find(({ name }: MovieShortInfo | MovieShortInfo & MovieAdditionalInfo) => name === movieName);

    return {
        movie
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<Store, null, Actions>, ownProps: OwnProps): MappedDispatchProps => {
    return {
        getMovieInfo: () => dispatch(getMovieFullInfo(ownProps.match.params.name)),
    }
}

export const MoviePageContainer = connect(mapStateToProps, mapDispatchToProps)(MoviePage);
