import * as React from "react";
import { ReviewItem } from "../ReviewItem";
import { User, Review } from '../../Types';

export interface Props {
    movie: string;
    user: User | null;
    reviews: Review[];
    getMovieReviews: () => void;
    deleteReview: (id: number) => void;
}

export class Reviews extends React.Component<Props> {

    public componentDidMount(): void {
        if (!(this.props.reviews && this.props.reviews.length)) {
            this.props.getMovieReviews();
        }
    }

    public render() {
        const { reviews } = this.props;

        return reviews && Boolean(reviews.length) ? reviews.map(review => <ReviewItem onDelete={(id: number) => this.props.deleteReview(id)} review={review} movie={this.props.movie} key={review.id} />) : <div>Пока никто не написал рецензии. Станьте первым!</div>
    }
}
