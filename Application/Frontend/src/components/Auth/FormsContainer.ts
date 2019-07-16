import { Form, Props } from "./Forms";
import { registerAndLoginUser, logInUser } from "../../Store/Actions/users";
import { connect } from 'react-redux';
import { Store } from 'Store/Store';
import { ThunkDispatch } from 'redux-thunk';
import { Actions } from 'Store/Actions/Actions';

type MappedDispatchProps = Pick<Props, "logInUser" | "registerAndLoginUser">;

const mapDispatchToProps = (dispatch: ThunkDispatch<Store, null, Actions>): MappedDispatchProps => {
    return {
        logInUser: (email: string, password: string) => dispatch(logInUser(email, password)),
        registerAndLoginUser: (name: string, email: string, password: string) => dispatch(registerAndLoginUser(name, email, password)),
    }
}

export const FormsContainer = connect(() => { }, mapDispatchToProps)(Form);
