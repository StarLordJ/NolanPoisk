import * as React from "react";
import { Link } from "react-router-dom";
import { MovieShortInfo } from 'components/Types';

import styles from "./style.less";

interface Props {
    movie: MovieShortInfo
}

export function MovieItem(props: Props) {
    const { movie } = props;

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
