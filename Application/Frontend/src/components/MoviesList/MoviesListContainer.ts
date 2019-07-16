import { MoviesList, Props } from "./MoviesList";
import { getMovies } from "../../Store/Actions/movies";
import { connect } from 'react-redux';
import { Store } from 'Store/Store';
import { ThunkDispatch } from 'redux-thunk';
import { Actions } from 'Store/Actions/Actions';

type MappedStateProps = Pick<Props, "movies">;
type MappedDispatchProps = Pick<Props, "getMovies">;

const mapStateToProps = (state: Store.State): MappedStateProps => {
    return {
        movies: state.movies.allMovies,
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<Store.State, null, Actions>): MappedDispatchProps => {
    return {
        getMovies: () => dispatch(getMovies()),
    }
}

export const MoviesListContainer = connect(mapStateToProps, mapDispatchToProps)(MoviesList);
