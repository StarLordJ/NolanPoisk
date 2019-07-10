import React from "react";
import { MoviesListContainer as MoviesList } from "../MoviesList/MoviesListContainer";
import { HeaderContainer as Header } from "../Header/HeaderContainer"
import { Router, Route } from "react-router";
import { createHashHistory } from "history";
import { MoviePageContainer as MoviePage } from '../MoviePage/MoviePage';
import { User } from "../Types";

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
                <Header />
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
