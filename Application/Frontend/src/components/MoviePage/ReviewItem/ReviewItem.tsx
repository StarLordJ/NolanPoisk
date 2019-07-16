import * as React from "react";
import { User, Review } from '../../Types';
import { ReviewForm } from "../ReviewForm/ReviewForm";

import styles from "./style.less";

export interface Props {
    review: Review;
    user: User | null;
    movie: string;
    onDelete: (id: number) => void;
    updateMovieReview: (text: string, cb: (status: boolean) => void) => void;
}

interface State {
    isEditing: boolean;
}

export class ReviewItem extends React.Component<Props, State> {
    state = { isEditing: false };

    render() {
        return this.renderReview();
    }

    private renderEditButton = (): JSX.Element | null => {
        const { user, review } = this.props;

        if (user && user.email === review.email || user && user.privilege) {
            return <div onClick={() => this.setState({ isEditing: true })} className={styles.pencil}>✎</div>
        }

        return null;
    }

    private renderRemoveButton = (): JSX.Element | null => {
        const { user, review } = this.props;

        if (user && user.email === review.email || user && user.privilege) {
            return <div onClick={() => this.props.onDelete(this.props.review.id)} className={styles.deleteReview} >✖</div >
        }

        return null;
    }

    private renderReview = (): JSX.Element | null => {
        const { review } = this.props;

        return (
            <div className={styles.reviewItem}>
                {!this.state.isEditing ?
                    <React.Fragment>
                        <div className={styles.panelActions}>
                            {this.renderEditButton()}
                            {this.renderRemoveButton()}
                        </div>
                        <div>{review.username}</div>
                        <div>{review.date}</div>
                        <div>{review.text}</div>
                    </React.Fragment> :
                    <ReviewForm defaultText={this.props.review.text} width={800} movie={this.props.movie} updateMovieReview={text => {
                        this.props.updateMovieReview(text, (status: boolean) => {
                            if (status) {
                                this.setState({ isEditing: false })
                            }
                        })
                    }}></ReviewForm>}
            </div>
        )
    }
}
