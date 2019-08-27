import * as React from "react";
import { connect } from 'react-redux';
import { Modal } from "./Modal";
import { closeToast } from "../../Store/Actions/toast";
import { Dispatch } from "redux";

import { Store } from "../../Store/Store";

import styles from "./style.less";

interface ToastsContainerProps {
    toasts: string[];
}

interface ToastProps {
    text: string;
    id: number;
    close: () => void;
}

const Toast = (props: ToastProps) => {
    const [classname, change] = React.useState(styles.toastFadeIn);
    let timeOutID = 0;

    const close = () => {
        change(styles.toastFadeOut);
        setTimeout(props.close, 250);
    }

    React.useEffect(() => {
        clearTimeout(timeOutID);
        console.log("here!")
        timeOutID = window.setTimeout(close, 5000);
    }, [])

    return (
        <div className={styles.toast + " " + classname}>
            <div onClick={close} className={styles.cross}>✖</div>
            <div className={styles.text}>{props.text}</div>
        </div>
    )
};

const mapDispatchToProps = (dispatch: Dispatch, ownProps: { id: number }) => ({
    close: () => dispatch(closeToast(ownProps.id))
});

const ToastContainer = connect(() => ({}), mapDispatchToProps)(Toast);

const Toasts = (props: ToastsContainerProps) => (<div className={styles.toastsContainer}>{Boolean(props.toasts.length) && props.toasts.slice().map((text, id) => <ToastContainer text={text} id={id} key={id} />)}</div>);

const mapStateToProps = (state: Store.State) => ({
    toasts: state.toast.toastText
});

const ToastConnected = connect(mapStateToProps)(Toasts);

export const ToastsContainer = () => <Modal><ToastConnected /></Modal>;
