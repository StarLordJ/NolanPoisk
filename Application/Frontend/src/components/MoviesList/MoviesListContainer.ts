import { MoviesList } from "./MoviesList";
import { getMovies } from "../../Store/Actions/movies";
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        movies: state.movies,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getMovies: () => dispatch(getMovies()),
    }
}

export const MoviesListContainer = connect(mapStateToProps, mapDispatchToProps)(MoviesList);
