import * as React from "react";
import { RegistrationForm } from "../Auth/Forms";
import { Link } from "react-router-dom";

import styles from "./style.less"
import { User } from 'index';

interface Props {
    user: User | null;
    onLogOut: () => Promise<void>;
}

interface State {
    isRegisration: boolean;
    isAuthorisation: boolean;
}

export class Header extends React.Component<Props, State> {
    state: State = { isRegisration: false, isAuthorisation: false };

    render() {
        const { user } = this.props;
        return (
            <div className={styles.header}>
                <div className={styles.container}>
                    <Link className={styles.headerLink} to="/"><h1>НоланПоиск</h1></Link>
                    {!user ? null : user.email && user.name ? this.renderUserHeader() : this.renderActions()}
                </div>
                {this.state.isRegisration || this.state.isAuthorisation ? this.renderRegistrationForm() : null}
            </div >
        )
    }

    private renderActions = (): JSX.Element => (
        <div className={styles.actions}>
            <div className={styles.action} onClick={this.handleRegistrationInit}>Регистрация</div>
            <div className={styles.action} onClick={this.handleAuthorisationInit}>Авторизация</div>
        </div>
    )

    private renderUserHeader = (): JSX.Element => (
        <div className={styles.actions}>
            <div className={styles.username}>{this.props.user.name}</div>
            <div className={styles.action} onClick={this.handleLogOut}>Выход</div>
        </div>
    )

    private renderRegistrationForm = (): JSX.Element => <RegistrationForm onClick={this.resetState} isRegisration={this.state.isRegisration} />;
    private handleRegistrationInit = (): void => this.setState({ isRegisration: true });
    private handleAuthorisationInit = (): void => this.setState({ isAuthorisation: true });

    private resetState = async (): Promise<void> => {
        await this.props.onLogOut();
        this.setState({ isAuthorisation: false, isRegisration: false });
    };

    private handleLogOut = async (): Promise<void> => {
        logOutUser();
        await this.props.onLogOut();
    }
}
