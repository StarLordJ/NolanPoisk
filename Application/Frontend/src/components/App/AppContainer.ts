import { App } from "./App";
import { checkUserIsLogin } from '../../Store/Actions/users';
import { connect } from "react-redux";
import { Store } from 'Store/Store';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';

const mapStateToProps = (state: Store) => {
    const user = state.user || null;
    return { user };
}

const mapDispatchToProps = (dispatch: ThunkDispatch<Store, null, Action>) => {
    return {
        checkUserIsLogin: (token: string) => dispatch(checkUserIsLogin(token))
    }
}

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
