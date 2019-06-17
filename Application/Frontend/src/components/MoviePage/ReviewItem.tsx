import * as React from "react";

import styles from "./style.less";
import { User } from 'index';

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
}

export class ReviewItem extends React.Component<Props> {
    props: Props;

    render() {
        const { review } = this.props;

        return this.renderReview();
    }

    private renderEditButton = (): JSX.Element | null => {
        const { user, review } = this.props;

        if (!user || user.email !== review.authorEmail) return null;

        return <button>Редактировать ревью</button>
    }

    private renderRemoveButton = (): JSX.Element | null => {
        const { user = {}, review } = this.props;

        if (user.email === review.authorEmail || user.privilege) {
            return <button>Удалить ревью</button>
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
                {this.renderEditButton()}
                {this.renderRemoveButton()}
                <div>{review.author}</div>
                <div>{review.date}</div>
                <div>{review.text}</div>
            </div>
        )
    }
}
