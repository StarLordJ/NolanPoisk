import ApiClient from "../../Api/ApiClient"
import { Dispatch } from 'redux';

export enum Actions {
    FETCH_USER_BY_TOKEN = "FETCH_USER_BY_TOKEN",
    LOGIN_USER = "LOGIN_USER",
    LOGOUT_USER = "LOGOUT_USER",
    REGISTER_AND_LOGIN_USER = "REGISTER_AND_LOGIN_USER"
}

export function checkUserIsLogin(token: string) {
    return async (dispatch: Dispatch) => {
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

export function logInUser(email: string, password: string) {
    return async (dispatch: Dispatch) => {
        try {
            const user = await ApiClient.authorizeUser(email, password);
            dispatch({
                type: Actions.LOGIN_USER,
                user,
            })
        } catch (e) {
            console.log(e);
        }
    }
}

export function logOutUser() {
    return (dispatch: Dispatch) => {
        ApiClient.logOutUser();
        dispatch({
            type: Actions.LOGOUT_USER,
            user: null
        });
    }
}

export function registerAndLoginUser(name: string, email: string, password: string) {
    return async (dispatch: Dispatch) => {
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
            console.log(e);
        }
    }
}
