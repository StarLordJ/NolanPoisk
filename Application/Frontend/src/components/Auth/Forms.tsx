import * as React from "react";
import { Modal } from "./Modal";
import { authorizeUser, registerUser } from "../../Api/ApiClient";

import styles from "./style.less"

interface Props {
    onClick: () => void;
    isRegisration: boolean;
}

interface State {
    name: string;
    email: string;
    password: string;
}

export class RegistrationForm extends React.Component<Props, State> {
    state: State = { name: "", email: "", password: "" }

    render() {
        return (
            <Modal>
                <div className={styles.RegistrationForm}>
                    <form className={styles.form} onSubmit={this.handleSubmit}>
                        <h1>{this.props.isRegisration ? "Регистрация" : "Авторизация"}</h1>
                        <div className={styles.formFields}>
                            {this.props.isRegisration && <input onChange={this.handleName} value={this.state.name} className={styles.input} type="text" placeholder="Имя" required></input>}
                            <input onChange={this.handleEmail} value={this.state.email} className={styles.input} type="email" placeholder="Email" required></input>
                            <input onChange={this.handlePassword} value={this.state.password} className={styles.input} type="password" placeholder="Пароль" required></input>
                        </div>
                        <button className={styles.button} type="submit">{this.props.isRegisration ? "Зарегистрироваться" : "Авторизоваться"}</button>
                    </form>
                </div>
            </Modal>
        )
    }

    private handleName = (event: React.SyntheticEvent<HTMLInputElement>) => this.setState({ name: event.target.value })
    private handleEmail = (event: React.SyntheticEvent<HTMLInputElement>) => this.setState({ email: event.target.value })
    private handlePassword = (event: React.SyntheticEvent<HTMLInputElement>) => this.setState({ password: event.target.value })

    private handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();

        const { name, email, password } = this.state;

        if (this.props.isRegisration) {
            await registerUser(name, email, password);
            await authorizeUser(email, password);
        } else {
            await authorizeUser(email, password);
        }

        await this.props.onClick();
    }
}
