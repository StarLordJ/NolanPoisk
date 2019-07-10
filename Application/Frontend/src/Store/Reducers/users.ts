import { Actions } from "../Actions/users";
import { User } from 'components/App/App';

export function user(state = null, action: { type: string, user: User | undefined }) {
    switch (action.type) {
        case Actions.FETCH_USER_BY_TOKEN:
            return action.user || null;
        default:
            return state;
    }
}
