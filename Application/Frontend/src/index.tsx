import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { MoviesList } from "./components/MoviesList/MoviesList";
import { Header } from "./components/Header/Header"
import { Router, Route } from "react-router";
import { createHashHistory } from "history";
import { MoviePage } from './components/MoviePage/MoviePage';
import { checkUserIsLogin } from "./Api/Api";

export interface User {
    name: string;
    email: string;
    privilege: boolean;
}

interface State {
    user: User | null;
}

class App extends React.Component<P, State> {
    state: State = { user: null }

    public async componentDidMount(): Promise<void> {
        await this.checkIsLogin();
    }

    render() {
        const handledMoviePage = (props) => <MoviePage user={this.state.user} {...props} />
        return (
            <Router history={createHashHistory()}>
                <Header user={this.state.user} onLogOut={this.checkIsLogin} />
                <Route exact path="/" component={MoviesList} />
                <Route path="/movie/:name" component={handledMoviePage} />
            </Router>
        )
    }

    private checkIsLogin = async (): Promise<void> => {
        const accessString = localStorage.getItem("JWT");

        if (accessString === null) {
            console.log("Авторизуйтесь!");
            this.setState({ user: { name: "", email: "", privilege: false } });
        } else {
            const response: {
                name: string;
                email: string;
                privilege: boolean;
            } = await checkUserIsLogin(accessString);

            this.setState({ user: { name: response.name, email: response.email, privilege: response.privilege } });
        }
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
