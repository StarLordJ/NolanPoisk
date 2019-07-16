import { Header, Props } from "./Header";
import { connect } from "react-redux";
import { logOutUser } from "../../Store/Actions/users"
import { Store } from 'Store/Store';
import { ThunkDispatch } from 'redux-thunk';
import { Actions } from 'Store/Actions/Actions';

type MappedStateProps = Pick<Props, "user">;
type MappedDispatchProps = Pick<Props, "logOutUser">;

const mapStateToProps = (state: Store): MappedStateProps => {
    return { user: state.user }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<Store, null, Actions>): MappedDispatchProps => {
    return {
        logOutUser: () => dispatch(logOutUser()),
    }
}

export const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header);
