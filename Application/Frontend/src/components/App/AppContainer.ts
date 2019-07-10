import { App } from "./App";
import { checkUserIsLogin } from '../../Store/Actions/users';
import { connect } from "react-redux";

const mapStateToProps = state => {
    const user = state.user || null;
    return { user };
}

const mapDispatchToProps = dispatch => {
    return {
        checkUserIsLogin: (token: string) => dispatch(checkUserIsLogin(token))
    }
}

export const AppInstance = connect(mapStateToProps, mapDispatchToProps)(App);
