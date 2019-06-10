import * as React from "react";
import { Reviews } from "./Reviews";
import { ReviewForm } from "./ReviewForm";
import { getMovieInfo } from "../../Api/Api";

import styles from "./style.less";

export interface Movie {
    name: string;
    cast: string[];
    tagline: string;
    description: string;
    trailerUrl: string;
    genre: string[];
    year: number;
    posterUrl: string;
}

interface Props {
    match: {
        params: {
            name: string;
        };
    }
}

interface State {
    movie: Movie | null;
}

export class MoviePage extends React.Component<Props> {
    public props: Props;
    public state: State = { movie: null };

    public async componentDidMount(): Promise<void> {
        const response = await getMovieInfo(this.props.match.params.name);
        this.setState({ movie: response });
    }

    private renderCastList(cast: string[]): JSX.Element {
        return (
            <ul className={styles.castList}>
                {cast.map(name => <li>{name}</li>)}
            </ul>
        )
    }

    render() {
        const { movie } = this.state;

        return movie && (
            <React.Fragment>
                <div className={styles.container}>
                    <img src={movie.posterUrl} alt={movie.name} />
                    <div className={styles.movieInfo}>
                        <h1 style={{ marginBottom: "20px" }}>{movie.name}</h1>
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
                    <ReviewForm isAutorised={true} movie={movie.name} />
                </div>
                <div className={styles.reviewsContainer}>
                    <Reviews movie={movie.name} />
                </div>
            </React.Fragment>
        )
    }

}
