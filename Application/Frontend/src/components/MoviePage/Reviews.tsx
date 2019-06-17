import * as React from "react";
import { Review, ReviewItem } from "./ReviewItem";
import { getMovieReviews } from "../../Api/Api"
import { User } from 'index';

interface Props {
    movie: string;
    user: User;
}

interface State {
    reviews: Review[];
}

export class Reviews extends React.Component<Props, State> {
    public state: State = { reviews: [] };

    public async componentDidMount(): Promise<void> {
        const reviews = await getMovieReviews(this.props.movie);

        this.setState({ reviews });
    }

    public render() {
        const { reviews } = this.state;

        return Boolean(reviews.length) ? reviews.map(review => <ReviewItem user={this.props.user} review={review} />) : <div>Пока никто не написал рецензии. Станьте первым!</div>
    }
}
