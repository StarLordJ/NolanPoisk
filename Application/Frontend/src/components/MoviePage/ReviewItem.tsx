import * as React from "react";
import { updateMovieReview } from "../../Store/Actions/reviews";

import { User } from '../Types';

import styles from "./style.less";
import { connect } from 'react-redux';


export interface Review {
    username: string;
    email: string;
    date: Date;
    text: string;
    isApproved: boolean;
    id: number;
}

interface Props {
    review: Review;
    user: User | null;
    movie: string;
    onDelete: (id: number) => void;
    updateMovieReview: (text: string, cb: (status: boolean) => void) => void;
}

export class ReviewItem extends React.Component<Props> {
    props: Props;
    state = { isEditing: false, text: "" };

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
                    <form onSubmit={this.handleSubmit} className={styles.form}>
                        <textarea className={styles.textarea} defaultValue={review.text} onChange={this.handleChange} style={{ width: "800px" }} />
                        <button className={styles.button} type="submit">Отправить</button>
                    </form>}
            </div>
        )
    }

    private handleChange = (e) => {
        this.setState({ text: e.target.value })
    }

    private handleSubmit = (e) => {
        e.preventDefault();
        this.props.updateMovieReview(this.state.text, (status: boolean) => {
            if (status) {
                this.setState({ isEditing: false });
            }
        });
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const { movie, review } = ownProps;
    return {
        updateMovieReview: (text: string, cb: (status: boolean) => void) => dispatch(updateMovieReview(movie, review.id, text, cb)),
    }
}

export const ReviewItemContainer = connect(mapStateToProps, mapDispatchToProps)(ReviewItem);
