export enum Actions {
    OPEN_TOAST = "OPEN_TOAST",
    CLOSE_TOAST = "CLOSE_TOAST",
}

export type ToastActions = { type: Actions.OPEN_TOAST, data: { toastText: string } } | { type: Actions.CLOSE_TOAST, data: { id: number } };

export function openToast(text: string) {
    return {
        type: Actions.OPEN_TOAST,
        data: { toastText: text }
    }
}

export function closeToast(id: number) {
    return {
        type: Actions.CLOSE_TOAST,
        data: { id }
    }
}
