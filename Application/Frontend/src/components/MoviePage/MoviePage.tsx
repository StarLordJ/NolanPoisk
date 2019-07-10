import * as React from "react";
import { Reviews } from "./Reviews";
import { ReviewForm } from "./ReviewForm";
import { User } from "../Types";
import { connect } from "react-redux";

import styles from "./style.less";
import { Raiting } from './Raiting';
import { getMovieFullInfo } from '../../Store/Actions/movies';

export interface Movie {
    name: string;
    cast: string[];
    tagline: string;
    description: string;
    trailerUrl: string;
    shortDescription: string;
    genre: string[];
    year: number;
    posterUrl: string;
}

interface Props {
    match: {
        params: {
            name: string;
        };
    },
    movie: Movie;
    getMovieInfo: () => void;
}

export class MoviePage extends React.Component<Props> {
    public props: Props;

    componentDidMount(): void {
        if (!(this.props.movie && this.props.movie.description)) {
            this.props.getMovieInfo();
        }
    }

    render() {
        const { movie } = this.props;

        return movie && movie.description ? (
            <React.Fragment>
                <div className={styles.container}>
                    <img src={movie.posterUrl} alt={movie.name} />
                    <div className={styles.movieInfo}>
                        <h1 style={{ marginBottom: "10px" }}>{movie.name}</h1>
                        <div style={{ color: "#6c6c6c", marginBottom: "20px" }}>{movie.tagline}</div>
                        <div className={styles.itemDescription}>Жанр</div>
                        <div>{movie.genre.join(", ")}</div>
                        <hr className={styles.hr} />
                        <div className={styles.itemDescription}>В ролях</div>
                        <div>{movie.cast.join(", ")}</div>
                        <hr className={styles.hr} />
                        <div className={styles.itemDescription}>Год выхода</div>
                        <div>{movie.year}</div>
                        <hr className={styles.hr} />
                        <div className={styles.itemDescription}>Описание</div>
                        <div>{movie.description}</div>
                    </div>
                </div>
                <div className={styles.reviewsContainer}>
                    <hr className={styles.hr} />
                    <div className={styles.itemDescription}>Рейтинг</div>
                    {this.props.user && <Raiting movie={movie.name} user={this.props.user} />}
                </div>
                <div className={styles.trailer}>
                    <h2 style={{ marginBottom: "20px" }}>Трейлер</h2>
                    <iframe
                        width="1000"
                        height="600"
                        src={`https://www.youtube.com/embed/${movie.trailerUrl.split("v=")[1]}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen>
                    </iframe>
                </div>
                <div className={styles.formContainer}>
                    <ReviewForm user={this.props.user} movie={movie.name} />
                </div>
                <div className={styles.reviewsContainer}>
                    <Reviews user={this.props.user} movie={movie.name} />
                </div>
            </React.Fragment>
        ) : null
    }

}

const mapStateToProps = (state, ownProps: Pick<Props, "match">) => {
    const movieName = ownProps.match.params.name;
    const movie = state.movies.find(({ name }: Movie) => name === movieName);

    return {
        movie
    }
}

const mapDispatchToProps = (dispatch, ownProps: Pick<Props, "match">) => {
    return {
        getMovieInfo: () => dispatch(getMovieFullInfo(ownProps.match.params.name)),
    }
}

export const MoviePageContainer = connect(mapStateToProps, mapDispatchToProps)(MoviePage);

