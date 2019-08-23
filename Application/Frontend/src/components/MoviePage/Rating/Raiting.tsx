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

export function Rating(props: Props) {
    const ratingHelpBuild = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
    const { averageRating, userMark = 0 } = props.rating;
    const { rating, count } = averageRating;

    const handleClick = (value: number): void => props.setUserRating(value);
    const handleOnDeleteClick = (): void => props.deleteUserRating();

    React.useEffect(() => {
        props.getMovieRating()
    });

    return (
        <div className={styles.ratingContainer}>
            <div className={styles.starsContainer}>
                {ratingHelpBuild.map(el => <Star key={el} value={el} onClick={handleClick} color={el <= userMark} />)}
            </div>
            <div className={styles.totalRating}>{`${rating}`}</div>
            <div className={styles.totalCount}>{`${count}`}</div>
            {Boolean(userMark) && <div className={styles.deleteButton} onClick={handleOnDeleteClick}>Удалить оценку</div>}
        </div>
    )
}

interface StarProps {
    color: boolean;
    value: number;
    onClick: (value: number) => void;
}

function Star(props: StarProps) {
    const handleClick = (): void => props.onClick(props.value);

    return (
        <div className={styles.starContainer}>
            <div onClick={handleClick} className={props.color ? styles.colorStar : styles.star}>★</div>
            <div className={styles.starValue}>{props.value}</div>
        </div>
    )
}
