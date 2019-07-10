import React from "react";
import { MoviesList } from "../MoviesList/MoviesList";
import { Header } from "../Header/Header"
import { Router, Route } from "react-router";
import { createHashHistory } from "history";
import { MoviePage } from '../MoviePage/MoviePage';

export interface User {
    name: string;
    email: string;
    privilege: boolean;
}

interface Props {
    user: User | null;
    checkUserIsLogin: (token: string) => void;
}

export class App extends React.Component<Props> {
    public async componentDidMount(): Promise<void> {
        await this.checkIsLogin();
    }

    render() {
        return (
            <Router history={createHashHistory()}>
                <Header onLogOut={this.checkIsLogin} />
                <Route exact path="/" component={MoviesList} />
                <Route path="/movie/:name" component={MoviePage} />
            </Router>
        )
    }

    private checkIsLogin = async (): Promise<void> => {
        const accessString = localStorage.getItem("JWT");

        if (accessString === null) {
            console.log("Авторизуйтесь!");
        } else {
            this.props.checkUserIsLogin(accessString);
        }
    }
}
