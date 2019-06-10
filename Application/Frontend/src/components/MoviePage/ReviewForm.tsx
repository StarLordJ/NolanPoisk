import * as React from "react";
import { sendFilmReview } from "../../Api/Api"

import styles from "./style.less";

interface Props {
    isAutorised: boolean;
    movie: string;
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
        await sendFilmReview(this.props.movie, this.state.value);
    }

    render() {
        return this.props.isAutorised ? (
            <form onSubmit={this.handleSubmit} className={styles.form}>
                <textarea className={styles.textarea} value={this.state.value} onChange={this.handleChange} />
                <button className={styles.button} type="submit">Отправить</button>
            </form>
        ) : (<div>Авторизуйтесь или зарегистрируйтесь, чтобы оставить рецензию на фильм!</div>)
    }
}
