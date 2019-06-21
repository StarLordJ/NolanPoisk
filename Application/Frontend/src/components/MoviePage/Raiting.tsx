import * as React from "react";
import { getMovieRatingOfUser, setUserRating, getMovieRating, deleteUserRating } from "../../Api/Api"
import { User } from 'index';

import styles from "./style.less"

interface Props {
    movie: string;
    user: User;
}

interface State {
    userRating: number;
    marksCount: number;
    fullRating: number;
}

export class Raiting extends React.Component {
    props: Props;
    state: State = { userRating: 0, fullRating: 0, marksCount: 0 }

    public async componentDidMount(): Promise<void> {
        const { movie } = this.props;
        const rating = await getMovieRatingOfUser(movie, this.props.user.email);
        const avrating = await getMovieRating(movie);

        this.setState({ userRating: rating || 0, marksCount: avrating.count || 0, fullRating: avrating.rating || 0 })
    }

    private handleClick = async (value: number): Promise<void> => {
        const { movie, user } = this.props;
        await setUserRating(value, movie, user.email);

        const avrating = await getMovieRating(movie);

        this.setState({ userRating: value, marksCount: avrating.count, fullRating: avrating.rating });
    }

    private handleOnDeleteClick = async (): Promise<void> => {
        const { movie, user } = this.props;
        await deleteUserRating(movie, user.email);

        const avrating = await getMovieRating(movie);

        this.setState({ userRating: 0, marksCount: avrating.count, fullRating: avrating.rating });
    }

    render() {
        return (
            <div>
                {
                    this.props.user.email ?
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(el => <Star key={el} value={el} onClick={this.handleClick} color={el <= this.state.userRating} />) :
                        <div>Войдите или зарегистрируйтесь, чтобы ставить оценки</div>
                }
                <div className={styles.rating}>{`${this.state.fullRating}`}</div>
                <div className={styles.totalCount}>{`${this.state.marksCount}`}</div>
                {Boolean(this.state.userRating) && <div className={styles.deleteButton} onClick={this.handleOnDeleteClick}>Удалить оценку</div>}
            </div>
        )
    }
}

class Star extends React.Component {
    props: { color: boolean; value: number; onClick: (value: number) => Promise<void> };

    private handleClick = async (): Promise<void> => {
        this.props.onClick(this.props.value);
    }

    render() {
        return (
            <div className={styles.starcontainer}>
                <div onClick={this.handleClick} className={this.props.color ? styles.colorStar : styles.star}>★</div>
                <div className={styles.starvalue}>{this.props.value}</div>
            </div>

        )
    }

}
