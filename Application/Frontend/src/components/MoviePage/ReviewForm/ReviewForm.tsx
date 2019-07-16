import * as React from "react";

import styles from "./style.less";

export interface Props {
    movie: string;
    width?: number;
    sendMovieReview?: (name: string, text: string, cb: (status: boolean) => void) => void;
    updateMovieReview?: (text: string) => void;
    defaultText?: string;
}

interface State {
    value: string;
}

export class ReviewForm extends React.Component<Props, State> {
    public state: State = { value: this.props.defaultText || "" };

    public handleChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
        this.setState({ value: (event.target as HTMLTextAreaElement).value });
    }

    public handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        if (this.props.sendMovieReview) {
            this.props.sendMovieReview(this.props.movie, this.state.value, (status) => {
                if (status) {
                    this.setState({ value: "" });
                }
            });
        }
        if (this.props.updateMovieReview) {
            this.props.updateMovieReview(this.state.value)
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className={styles.form}>
                <textarea value={this.state.value} className={styles.textarea} onChange={this.handleChange} style={{ width: `${this.props.width}px` }} />
                <button className={styles.button} type="submit">Отправить</button>
            </form>
        )
    }
}
