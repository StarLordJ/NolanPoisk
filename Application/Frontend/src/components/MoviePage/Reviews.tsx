import * as React from "react";
import { Review, ReviewItem } from "./ReviewItem";
import { getMovieReviews, deleteReview } from "../../Api/Api"
import { User } from 'index';

interface Props {
    movie: string;
    user: User | null;
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

    public updateReviews = async (id: number): Promise<void> => {
        await deleteReview(id);

        const reviews = await getMovieReviews(this.props.movie);

        this.setState({ reviews });
    }

    public render() {
        const { reviews } = this.state;

        return Boolean(reviews.length) ? reviews.map(review => <ReviewItem onClick={this.updateReviews} user={this.props.user} review={review} movie={this.props.movie} />) : <div>Пока никто не написал рецензии. Станьте первым!</div>
    }
}
