import { App, Props } from "./App";
import { checkUserIsLogin } from '../../Store/Actions/users';
import { connect } from "react-redux";
import { Store } from 'Store/Store';
import { ThunkDispatch } from 'redux-thunk';
import { Actions } from 'Store/Actions/Actions';

type MappedStateProps = Pick<Props, "user">;
type MappedDispatchProps = Pick<Props, "checkUserIsLogin">;

const mapStateToProps = (state: Store): MappedStateProps => {
    const user = state.user || null;
    return { user };
}

const mapDispatchToProps = (dispatch: ThunkDispatch<Store, null, Actions>): MappedDispatchProps => {
    return {
        checkUserIsLogin: (token: string) => dispatch(checkUserIsLogin(token))
    }
}

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
