import { Header } from "./Header";
import { connect } from "react-redux";
import { logOutUser } from "../../Store/Actions/users"
import { Store } from 'Store/Store';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';

const mapStateToProps = (state: Store) => {
    return { user: state.user }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<Store, null, Action>) => {
    return {
        logOutUser: () => dispatch(logOutUser()),
    }
}

export const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header);
