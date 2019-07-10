import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { AppInstance } from "./components/App/AppContainer";
import { store } from "./Store/Store";
import { Provider } from "react-redux";


ReactDOM.render(<Provider store={store}><AppInstance /></Provider>, document.getElementById("root"));
