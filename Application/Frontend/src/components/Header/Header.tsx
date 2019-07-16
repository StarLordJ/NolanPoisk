import * as React from "react";
import { Form } from "../Auth";
import { Link } from "react-router-dom";

import styles from "./style.less"
import { User } from '../Types';

export interface Props {
    user: User | null;
    logOutUser: () => Promise<void>;
}

interface State {
    isRegisration: boolean;
    isAuthorisation: boolean;
    isPanelHidden: boolean;
}

export class Header extends React.Component<Props, State> {
    state: State = { isRegisration: false, isAuthorisation: false, isPanelHidden: true };

    componentDidMount() {
        setTimeout(() => {
            this.setState({ isPanelHidden: false })
        }, 400);
    }

    render() {
        const { user } = this.props;
        return (
            <div className={styles.header}>
                <div className={styles.container}>
                    <Link className={styles.headerLink} to="/"><h1>НоланПоиск</h1></Link>
                    {this.state.isPanelHidden ? null : (user ? this.renderUserHeader() : this.renderActions())}
                </div>
                {this.state.isRegisration || this.state.isAuthorisation ? this.renderRegistrationForm() : null}
            </div>
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
            <div className={styles.username}>{this.props.user && this.props.user.name}</div>
            <div className={styles.action} onClick={this.props.logOutUser}>Выход</div>
        </div>
    )

    private renderRegistrationForm = (): JSX.Element => <Form close={this.resetState} isRegisration={this.state.isRegisration} />;
    private handleRegistrationInit = (): void => this.setState({ isRegisration: true });
    private handleAuthorisationInit = (): void => this.setState({ isAuthorisation: true });

    private resetState = (): void => {
        this.setState({ isAuthorisation: false, isRegisration: false });
    };
}
