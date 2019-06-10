import * as React from "react";

import styles from "./style.less";

export interface Review {
    author: string;
    date: Date;
    text: string;
    isApproved: boolean;
}

interface Props {
    review: Review;
}

export class ReviewItem extends React.Component<Props> {
    props: Props;

    render() {
        const { review } = this.props;

        return (
            <div className={styles.reviewItem}>
                <div>{review.author}</div>
                <div>{review.date}</div>
                <div>{review.text}</div>
            </div>
        )
    }
}
