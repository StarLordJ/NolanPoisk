import ApiClient from "../../Api/ApiClient"
import { Dispatch } from 'redux';

export const FETCH_USER_BY_TOKEN = "FETCH_USER_BY_TOKEN";

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
            const user = await ApiClient.authorizeUser(email, password)
        }
    }
}
