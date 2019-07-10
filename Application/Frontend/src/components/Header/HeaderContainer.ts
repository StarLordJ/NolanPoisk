import { Header } from "./Header";
import { connect } from "react-redux";
import { logOutUser } from "../../Store/Actions/users"

const mapStateToProps = state => {
    return { user: state.user }
}

const mapDispatchToProps = dispatch => {
    return {
        logOutUser: () => dispatch(logOutUser()),
    }
}

export const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header);
