import * as React from "react";
import { RegistrationForm } from "../Auth/Forms";

import styles from "./style.less"

interface State {
    isRegisration: boolean;
    isAuthorisation: boolean;
}

export class Header extends React.Component<P, State> {
    state: State = { isRegisration: false, isAuthorisation: false };

    render() {
        return (
            <div className={styles.header}>
                <div className={styles.container}>
                    <h1>НоланПоиск</h1>
                    <div className={styles.actions}>
                        <div className={styles.action} onClick={this.handleRegistrationInit}>Регистрация</div>
                        <div className={styles.action} onClick={this.handleAuthorisationInit}>Авторизация</div>
                    </div>
                </div>
                {this.state.isRegisration || this.state.isAuthorisation ? this.renderRegistrationForm() : null}
            </div>
        )
    }

    private renderRegistrationForm = (): JSX.Element => <RegistrationForm onClick={this.resetState} isRegisration={this.state.isRegisration} />;

    private handleRegistrationInit = (): void => this.setState({ isRegisration: true });
    private handleAuthorisationInit = (): void => this.setState({ isAuthorisation: true });
    private resetState = (): void => this.setState({ isAuthorisation: false, isRegisration: false });
}
