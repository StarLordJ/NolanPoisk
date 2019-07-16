import { MoviesList } from "./MoviesList";
import { getMovies } from "../../Store/Actions/movies";
import { connect } from 'react-redux';
import { Store } from 'Store/Store';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';

const mapStateToProps = (state: Store) => {
    return {
        movies: state.movies,
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<Store, null, Action>) => {
    return {
        getMovies: () => dispatch(getMovies()),
    }
}

export const MoviesListContainer = connect(mapStateToProps, mapDispatchToProps)(MoviesList);
