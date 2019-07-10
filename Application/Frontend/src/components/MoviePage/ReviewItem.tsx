import * as React from "react";
import { updateMovieReview } from "../../Api/ApiClient";
import { User } from 'index';

import styles from "./style.less";


export interface Review {
    username: string;
    useremail: string;
    date: Date;
    text: string;
    isApproved: boolean;
    id: number;
}

interface Props {
    review: Review;
    user: User | null;
    movie: string;
    onClick: (id: number) => Promise<void>;
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

        if (!user || user.email !== review.useremail) return null;

        return <div onClick={this.editText} className={styles.pencil}>✎</div>
    }

    private handleClick = async (): Promise<void> => {
        await this.props.onClick(this.props.review.id);
    }

    private renderRemoveButton = (): JSX.Element | null => {
        const { user = {}, review } = this.props;

        if (user.email === review.useremail || user.privilege) {
            return <div onClick={this.handleClick} className={styles.deleteReview}>✖</div>
        }

        return null;
    }

    private renderReview = (): JSX.Element | null => {
        const { user, review } = this.props;

        if (!user || !review.isApproved && user.email !== review.useremail && !user.privilege) {
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
                        <div>{review.username}</div>
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
        await updateMovieReview(this.props.review.id, this.state.text);
        this.setState({ isEditing: false });
    }
}
