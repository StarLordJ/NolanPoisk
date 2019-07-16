import React from "react";
import { MoviesList } from "../MoviesList";
import { Header } from "../Header"
import { Router, Route } from "react-router";
import { createHashHistory } from "history";
import { MoviePage } from '../MoviePage';
import { User } from "../Types";

export interface Props {
    user: User | null;
    checkUserIsLogin: (token: string) => void;
}

export class App extends React.Component<Props> {
    public componentDidMount(): void {
        this.checkIsLogin();
    }

    render() {
        return (
            <Router history={createHashHistory()}>
                <Header />
                <Route exact path="/" component={MoviesList} />
                <Route path="/movie/:name" component={MoviePage} />
            </Router>
        )
    }

    private checkIsLogin = (): void => {
        const accessString = localStorage.getItem("JWT");

        if (accessString === null) {
            console.log("Авторизуйтесь!");
        } else {
            this.props.checkUserIsLogin(accessString);
        }
    }
}
