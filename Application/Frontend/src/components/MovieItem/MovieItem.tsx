import * as React from "react";
import { Link } from "react-router-dom";

import styles from "./style.less";

export interface Movie {
    name: string;
    shortDescription: string;
    genre: string[];
    year: number;
    posterUrl: string;
}

interface Props {
    movie: Movie
}

export class MovieItem extends React.Component<Props> {
    public props: Props;

    render() {
        const { movie } = this.props;

        return (
            <div className={styles.movieItem}>
                <img className={styles.poster} src={movie.posterUrl} alt={movie.name} />
                <div className={styles.movieInfo}>
                    <h2>{movie.name}</h2>
                    <div>{movie.genre.join(", ")}</div>
                    <div>{movie.year}</div>
                    <div>{movie.shortDescription}</div>
                    <Link to={`/movie/${movie.name}`}>Открыть страницу с фильмом</Link>
                </div>
            </div>
        )
    }

}
