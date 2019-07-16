import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { App } from "./components/App";
import { store } from "./Store/Store";
import { Provider } from "react-redux";


ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById("root"));
