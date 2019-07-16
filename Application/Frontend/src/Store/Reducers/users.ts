import { Actions, UserActions } from "../Actions/users";
import { Store } from 'Store/Store';

export function user(state: Store.user = null, action: UserActions): Store.user {
    switch (action.type) {
        case Actions.LOGIN_USER:
        case Actions.FETCH_USER_BY_TOKEN:
        case Actions.LOGOUT_USER:
        case Actions.REGISTER_AND_LOGIN_USER:
            return action.user;
        default:
            return state;
    }
}
