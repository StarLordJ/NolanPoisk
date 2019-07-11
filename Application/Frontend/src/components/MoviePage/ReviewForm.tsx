import * as React from "react";
import { sendMovieReview } from "../../Store/Actions/reviews";
import styles from "./style.less";
import { User } from '../Types';
import { connect } from 'react-redux';

interface Props {
    movie: string;
    user: User | null;
    sendMovieReview: (name: string, text: string, cb: (status: boolean) => void) => void;
}

interface State {
    value: string;
}

export class ReviewForm extends React.Component<Props, State> {
    public props: Props;
    public state: State = { value: "" };

    public handleChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
        this.setState({ value: event.target.value });
    }

    public handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        this.props.sendMovieReview(this.props.movie, this.state.value, (status) => {
            if (status) {
                this.setState({ value: "" });
            }
        });
    }

    render() {
        const { user } = this.props;

        return user ? (
            <form onSubmit={this.handleSubmit} className={styles.form}>
                <textarea className={styles.textarea} value={this.state.value} onChange={this.handleChange} />
                <button className={styles.button} type="submit">Отправить</button>
            </form>
        ) : (<div>Авторизуйтесь или зарегистрируйтесь, чтобы оставить рецензию на фильм!</div>)
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        sendMovieReview: (name: string, text: string, cb: (status: boolean) => void) => dispatch(sendMovieReview(name, text, cb)),
    }
}

export const ReviewFormContainer = connect(mapStateToProps, mapDispatchToProps)(ReviewForm);
