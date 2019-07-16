import { Actions } from "../Actions/users";
import { User } from 'components/Types';

export function user(state = null, action: { type: Actions, user: User | null }) {
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
