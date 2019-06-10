import React from "react";
import { MovieItem, Movie } from "../MovieItem/MovieItem";
import { getAllMovies } from "../../Api/Api";

import styles from "./style.less";

interface State {
    moviesList: Movie[];
}

export class MoviesList extends React.Component<T, State> {
    state: State = { moviesList: [] };

    async componentDidMount(): Promise<void> {
        const moviesList = await getAllMovies();
        this.setState({ moviesList });
    }

    render() {
        const { moviesList } = this.state;

        return (
            <div className={styles.main}>
                <div className={styles.movieContainer}>
                    {Boolean(moviesList.length) && moviesList.map(movie => <MovieItem movie={movie} />)}
                </div>
            </div>
        )
    }
}
