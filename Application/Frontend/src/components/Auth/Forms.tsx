import * as React from "react";
import { Modal } from "./Modal";

import styles from "./style.less"

export interface Props {
    logInUser: (email: string, password: string) => void;
    registerAndLoginUser: (name: string, email: string, password: string) => void;
    close: () => void;
    isRegisration: boolean;
}

interface State {
    name: string;
    email: string;
    password: string;
}

export class Form extends React.Component<Props, State> {
    state: State = { name: "", email: "", password: "" }

    render(): JSX.Element {
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

    private handleName = (event: React.SyntheticEvent<HTMLInputElement>) => this.setState({ name: (event.target as HTMLInputElement).value })
    private handleEmail = (event: React.SyntheticEvent<HTMLInputElement>) => this.setState({ email: (event.target as HTMLInputElement).value })
    private handlePassword = (event: React.SyntheticEvent<HTMLInputElement>) => this.setState({ password: (event.target as HTMLInputElement).value })

    private handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>): void => {
        event.preventDefault();

        const { name, email, password } = this.state;

        if (this.props.isRegisration) {
            this.props.registerAndLoginUser(name, email, password)
        } else {
            this.props.logInUser(email, password);
        }

        this.props.close();
    }
}
