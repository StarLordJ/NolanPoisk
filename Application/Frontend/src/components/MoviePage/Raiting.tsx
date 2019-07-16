import * as React from "react";
import { getMovieRating, setUserRating, deleteUserRating } from "../../Store/Actions/rating";

import styles from "./style.less"
import { connect } from 'react-redux';
import { User } from 'components/Types';

interface Props {
    movie: string;
    user: User;
    rating: {
        averageRating: {
            count: number;
            rating: number;
        };
        userMark?: number;
    };
    setUserRating: (mark: number) => void;
    deleteUserRating: () => void;
    getMovieRating: () => void;
}

export class Raiting extends React.Component<Props> {
    public async componentDidMount(): Promise<void> {
        await this.props.getMovieRating();
    }

    private handleClick = async (value: number): Promise<void> => {
        await this.props.setUserRating(value);
    }

    private handleOnDeleteClick = async (): Promise<void> => {
        await this.props.deleteUserRating();
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

const mapStateToProps = (state, ownProps: Pick<Props, "movie">) => {
    return {
        rating: state.ratings[ownProps.movie] || { averageRating: { rating: 0, count: 0 }, userMark: 0 },
        user: state.user,
    }
}

const mapDispatchToProps = (dispatch, ownProps: Pick<Props, "movie">) => {
    return {
        deleteUserRating: () => dispatch(deleteUserRating(ownProps.movie)),
        setUserRating: (mark: number) => dispatch(setUserRating(mark, ownProps.movie)),
        getMovieRating: () => dispatch(getMovieRating(ownProps.movie)),
    }
}

export const RatingContainer = connect(mapStateToProps, mapDispatchToProps)(Raiting);

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
