import { Form } from "./Forms";
import { registerAndLoginUser, logInUser } from "../../Store/Actions/users";
import { connect } from 'react-redux';


const mapStateToProps = state => {
    return {};
}

const mapDispatchToProps = dispatch => {
    return {
        logInUser: (email: string, password: string) => dispatch(logInUser(email, password)),
        registerAndLoginUser: (name: string, email: string, password: string) => dispatch(registerAndLoginUser(name, email, password)),
    }
}

export const FormsContainer = connect(mapStateToProps, mapDispatchToProps)(Form);
