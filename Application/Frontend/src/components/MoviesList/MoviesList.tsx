import React from "react";
import { MovieItem, Movie } from "../MovieItem/MovieItem";

import styles from "./style.less";

interface Props {
    movies: Movie[];
    getMovies: () => void;
}

export class MoviesList extends React.Component<Props> {
    componentDidMount(): void {
        if (this.props.movies.length < 2) {
            this.props.getMovies();
        }
    }

    render() {
        const { movies } = this.props;

        return (
            <div className={styles.main}>
                <div className={styles.movieContainer}>
                    {Boolean(movies.length) && movies.map(movie => <MovieItem movie={movie} key={movie.name} />)}
                </div>
            </div>
        )
    }
}
