import * as React from "react";
import { sendFilmReview } from "../../Api/Api";
import { User } from 'index';

import styles from "./style.less";


export interface Review {
    author: string;
    authorEmail: string;
    date: Date;
    text: string;
    isApproved: boolean;
}

interface Props {
    review: Review;
    user: User | null;
    movie: string;
    onClick: (user: User, movie: string) => Promise<void>;
}

export class ReviewItem extends React.Component<Props> {
    props: Props;
    state = { isEditing: false, text: "" };

    render() {
        return this.renderReview();
    }

    public componentDidMount(): void {
        this.setState({ text: this.props.review.text })
    }

    private editText = (): void => {
        this.setState({ isEditing: true })
    }

    private renderEditButton = (): JSX.Element | null => {
        const { user, review } = this.props;

        if (!user || user.email !== review.authorEmail) return null;

        return <div onClick={this.editText} className={styles.pencil}>✎</div>
    }

    private handleClick = async (): Promise<void> => {
        await this.props.onClick(this.props.user, this.props.movie);
    }

    private renderRemoveButton = (): JSX.Element | null => {
        const { user = {}, review } = this.props;

        if (user.email === review.authorEmail || user.privilege) {
            return <div onClick={this.handleClick} className={styles.deleteReview}>✖</div>
        }

        return null;
    }

    private renderReview = (): JSX.Element | null => {
        const { user, review } = this.props;

        if (!user || !review.isApproved && user.email !== review.authorEmail && !user.privilege) {
            return null;
        }
        return (
            <div className={styles.reviewItem}>
                {!this.state.isEditing ?
                    <React.Fragment>
                        <div className={styles.panelActions}>
                            {this.renderEditButton()}
                            {this.renderRemoveButton()}
                        </div>
                        <div>{review.author}</div>
                        <div>{review.date}</div>
                        <div>{this.state.text}</div>
                    </React.Fragment> :
                    <form onSubmit={this.handleSubmit} className={styles.form}>
                        <textarea className={styles.textarea} value={this.state.text} onChange={this.handleChange} style={{ width: "800px" }} />
                        <button className={styles.button} type="submit">Отправить</button>
                    </form>}
            </div>
        )
    }

    private handleChange = (e) => {
        this.setState({ text: e.target.value })
    }

    private handleSubmit = async (e) => {
        e.preventDefault();
        const { movie, user } = this.props;

        await sendFilmReview(user, movie, this.state.text, true);
        this.setState({ isEditing: false });
    }
}
