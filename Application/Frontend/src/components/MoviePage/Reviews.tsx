import * as React from "react";
import { Review, ReviewItemContainer as ReviewItem } from "./ReviewItem";
import { getMovieReviews, deleteMovieReview } from "../../Store/Actions/reviews";
import { User } from '../Types';
import { connect } from 'react-redux';

interface Props {
    movie: string;
    user: User | null;
    reviews: Review[];
    getMovieReviews: () => void;
    deleteReview: (id: number) => void;
}

export class Reviews extends React.Component<Props> {

    public async componentDidMount(): Promise<void> {
        if (!(this.props.reviews && this.props.reviews.length)) {
            this.props.getMovieReviews();
        }
    }

    public render() {
        const { reviews } = this.props;

        return reviews && Boolean(reviews.length) ? reviews.map(review => <ReviewItem onDelete={(id: number) => this.props.deleteReview(id)} review={review} movie={this.props.movie} key={review.id} />) : <div>Пока никто не написал рецензии. Станьте первым!</div>
    }
}

const mapStateToProps = (state, ownProps) => {
    const { movie } = ownProps;
    const reviews = state.reviews[movie];

    return { reviews };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const { movie } = ownProps;

    return {
        getMovieReviews: () => dispatch(getMovieReviews(movie)),
        deleteReview: (id: number) => dispatch(deleteMovieReview(movie, id)),
    }
}

export const ReviewsContainer = connect(mapStateToProps, mapDispatchToProps)(Reviews);
