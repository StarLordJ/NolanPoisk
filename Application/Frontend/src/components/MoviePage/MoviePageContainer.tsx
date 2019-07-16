import { connect } from "react-redux";
import { getMovieFullInfo } from '../../Store/Actions/movies';
import { Store } from 'Store/Store';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { MovieShortInfo, MovieAdditionalInfo } from 'components/Types';
import { MoviePage, Props } from "./MoviePage";

const mapStateToProps = (state: Store, ownProps: Pick<Props, "match">) => {
    const movieName = ownProps.match.params.name;
    const movie = state.movies.find(({ name }: MovieShortInfo | MovieShortInfo & MovieAdditionalInfo) => name === movieName);

    return {
        movie
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<Store, null, Action>, ownProps: Pick<Props, "match">) => {
    return {
        getMovieInfo: () => dispatch(getMovieFullInfo(ownProps.match.params.name)),
    }
}

export const MoviePageContainer = connect(mapStateToProps, mapDispatchToProps)(MoviePage);
