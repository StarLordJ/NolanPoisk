import { Actions, ToastActions } from "../Actions/toast";
import { Store } from "../Store";

export function toast(state: Store.toast = { toastText: [] }, action: ToastActions) {
    switch (action.type) {
        case Actions.OPEN_TOAST: {
            const newToast: Store.toast = { toastText: [] };
            newToast.toastText = [...state.toastText, action.data.toastText];

            return { ...state, ...newToast }
        }
        case Actions.CLOSE_TOAST: {
            const newToast: Store.toast = { toastText: state.toastText.filter((_, i) => i !== action.data.id) };

            return { ...state, ...newToast }
        }
        default: {
            return state;
        }
    }
}
