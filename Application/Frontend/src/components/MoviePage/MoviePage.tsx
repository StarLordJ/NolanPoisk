import * as React from "react";
import { Reviews } from "./Reviews";
import { ReviewForm } from "./ReviewForm";
import { Rating } from "./Rating";
import { MoviePageInfo, User } from "components/Types";

import styles from "./style.less";
import { RouterProps } from "react-router";

export interface Props extends RouterProps {
    movie?: MoviePageInfo;
    user: User | null;
    getMovieInfo: () => void;
}

export class MoviePage extends React.Component<Props> {
    public componentDidMount(): void {
        if (!this.props.movie) {
            this.props.getMovieInfo();
        }
    }

    private handleGoBack = () => {
        this.props.history.goBack();
    };

    render(): React.ReactNode {
        const { movie } = this.props;

        return movie && movie.description ? (
            <React.Fragment>
                <div className={styles.container}>
                    <img src={movie.posterUrl} alt={movie.name} />
                    <div className={styles.movieInfo}>
                        <h1 style={{ marginBottom: "10px" }}>{movie.name}</h1>
                        <div style={{ color: "#6c6c6c", marginBottom: "20px" }}>
                            {movie.tagline}
                        </div>
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
                        <button
                            className={styles.buttonBack}
                            onClick={this.handleGoBack}
                        >
                            Вернуться к фильмам
                        </button>
                    </div>
                </div>
                <div className={styles.reviewsContainer}>
                    <hr className={styles.hr} />
                    <div className={styles.itemDescription}>Рейтинг</div>
                    <Rating movie={movie.name} />
                </div>
                <div className={styles.trailer}>
                    <h2 style={{ marginBottom: "20px" }}>Трейлер</h2>
                    <iframe
                        width="1000"
                        height="600"
                        src={`https://www.youtube.com/embed/${
                            movie.trailerUrl.split("v=")[1]
                        }`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
                <div className={styles.formContainer}>
                    {this.props.user ? (
                        <ReviewForm movie={movie.name} />
                    ) : (
                        <div>
                            Зарегистрируйтесь или войдите, чтобы оставить
                            рецензию!
                        </div>
                    )}
                </div>
                <div className={styles.reviewsContainer}>
                    <Reviews movie={movie.name} />
                </div>
            </React.Fragment>
        ) : null;
    }
}
