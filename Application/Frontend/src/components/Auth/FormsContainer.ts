import { Form } from "./Forms";
import { registerAndLoginUser, logInUser } from "../../Store/Actions/users";
import { connect } from 'react-redux';
import { Store } from 'Store/Store';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';

const mapStateToProps = (state: Store) => {
    return {};
}

const mapDispatchToProps = (dispatch: ThunkDispatch<Store, null, Action>) => {
    return {
        logInUser: (email: string, password: string) => dispatch(logInUser(email, password)),
        registerAndLoginUser: (name: string, email: string, password: string) => dispatch(registerAndLoginUser(name, email, password)),
    }
}

export const FormsContainer = connect(mapStateToProps, mapDispatchToProps)(Form);
