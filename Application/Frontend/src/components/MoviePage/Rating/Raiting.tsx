import * as React from "react";
import { User, RatingInfo } from 'components/Types';

import styles from "./style.less";

export interface Props {
    movie: string;
    user: User | null;
    rating: RatingInfo;
    setUserRating: (mark: number) => void;
    deleteUserRating: () => void;
    getMovieRating: () => void;
}

export class Rating extends React.Component<Props> {
    public componentDidMount(): void {
        if (this.props.rating)
            this.props.getMovieRating();
    }

    private handleClick = (value: number): void => {
        this.props.setUserRating(value);
    }

    private handleOnDeleteClick = (): void => {
        this.props.deleteUserRating();
    }

    render() {
        const { averageRating, userMark = 0 } = this.props.rating;
        const { rating, count } = averageRating;

        return (
            <div>
                {
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(el => <Star key={el} value={el} onClick={this.handleClick} color={el <= userMark} />)
                }
                <div className={styles.rating}>{`${rating}`}</div>
                <div className={styles.totalCount}>{`${count}`}</div>
                {Boolean(userMark) && <div className={styles.deleteButton} onClick={this.handleOnDeleteClick}>Удалить оценку</div>}
            </div>
        )
    }
}

interface StarProps {
    color: boolean;
    value: number;
    onClick: (value: number) => void;
}

class Star extends React.Component<StarProps> {
    private handleClick = (): void => {
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
