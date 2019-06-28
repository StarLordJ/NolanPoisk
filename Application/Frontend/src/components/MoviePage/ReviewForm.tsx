import * as React from "react";
import { sendMovieReview } from "../../Api/Api"

import styles from "./style.less";
import { User } from 'index';

interface Props {
    movie: string;
    user: User | null;
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

    public handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        await sendMovieReview(this.props.user, this.props.movie, this.state.value);
    }

    render() {
        const { user } = this.props;

        return !user ? null : user.name && user.email ? (
            <form onSubmit={this.handleSubmit} className={styles.form}>
                <textarea className={styles.textarea} value={this.state.value} onChange={this.handleChange} />
                <button className={styles.button} type="submit">Отправить</button>
            </form>
        ) : (<div>Авторизуйтесь или зарегистрируйтесь, чтобы оставить рецензию на фильм!</div>)
    }
}
