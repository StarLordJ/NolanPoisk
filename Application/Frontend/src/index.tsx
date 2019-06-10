import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { MoviesList } from "./components/MoviesList/MoviesList";
import { Header } from "./components/Header/Header"
import { Router, Route } from "react-router";
import { createBrowserHistory } from "history";
import { Link } from "react-router-dom"
import { MoviePage } from './components/MoviePage/MoviePage';

const route = (
    <div>
        <Header />
        <Route exact path="/" component={MoviesList} />
        <Route path="/movie/:name" component={MoviePage} />
        <Link to="/">Sf</Link>
    </div>
)

ReactDOM.render(
    <Router history={createBrowserHistory()}>
        {route}
    </Router>, document.getElementById("root"));
