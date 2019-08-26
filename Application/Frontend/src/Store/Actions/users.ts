import ApiClient from "../../Api/ApiClient";
import { ThunkDispatch, ThunkAction } from 'redux-thunk';
import { Store } from 'Store/Store';
import { User } from 'components/Types';
import { openToast, ToastActions } from "./toast";

export enum Actions {
    FETCH_USER_BY_TOKEN = "FETCH_USER_BY_TOKEN",
    LOGIN_USER = "LOGIN_USER",
    LOGOUT_USER = "LOGOUT_USER",
    REGISTER_AND_LOGIN_USER = "REGISTER_AND_LOGIN_USER"
}

export type UserActions = { type: Actions.FETCH_USER_BY_TOKEN, user: User }
    | { type: Actions.LOGIN_USER, user: User }
    | { type: Actions.LOGOUT_USER, user: null }
    | { type: Actions.REGISTER_AND_LOGIN_USER, user: User }


type MyThunkAction = ThunkAction<Promise<void>, Store.State, null, UserActions>;
type MyThunkDispatch = ThunkDispatch<Store.State, null, UserActions>;

export function checkUserIsLogin(token: string): MyThunkAction {
    return async (dispatch: MyThunkDispatch): Promise<void> => {
        try {
            const user = await ApiClient.checkUserIsLogin(token);
            dispatch({
                type: Actions.FETCH_USER_BY_TOKEN,
                user,
            })
        } catch (e) {
            console.log(e);
        }
    }
}

export function logInUser(email: string, password: string): MyThunkAction {
    return async (dispatch: MyThunkDispatch): Promise<void> => {
        try {
            const user = await ApiClient.authorizeUser(email, password);
            dispatch({
                type: Actions.LOGIN_USER,
                user,
            })
        } catch (e) {
            dispatch(openToast(e.data) as unknown as ThunkAction<void, Store.State, null, ToastActions>);
        }
    }
}

export function logOutUser(): MyThunkAction {
    return async (dispatch: MyThunkDispatch): Promise<void> => {
        ApiClient.logOutUser();
        dispatch({
            type: Actions.LOGOUT_USER,
            user: null
        });
    }
}

export function registerAndLoginUser(name: string, email: string, password: string): MyThunkAction {
    return async (dispatch: MyThunkDispatch): Promise<void> => {
        try {
            const response = await ApiClient.registerUser(name, email, password);

            if (response.status === 200) {
                try {
                    const user = await ApiClient.authorizeUser(email, password);
                    dispatch({
                        type: Actions.REGISTER_AND_LOGIN_USER,
                        user,
                    })
                } catch (er) {
                    console.log(er);
                }
            }
        } catch (e) {
            dispatch(openToast(e.data) as unknown as ThunkAction<void, Store.State, null, ToastActions>);
        }
    }
}
