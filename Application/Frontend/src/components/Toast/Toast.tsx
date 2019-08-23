import * as React from "react";
import { connect } from 'react-redux';
import { Store } from 'Store/Store';
import { closeToast } from "../../Store/Actions/toast";
import { Dispatch } from "redux";

interface ToastsContainerProps {
    toasts: string[] | [];
}

interface ToastProps {
    text: string;
    id: number;
    close: () => void;
}

const Toast = (props: ToastProps) => (<div>
    {props.text}
    <button onClick={props.close}>Закрыть</button>
</div>);

const mapDispatchToProps = (dispatch: Dispatch, ownProps: { id: number }) => ({
    close: () => dispatch(closeToast(ownProps.id))
});

const ToastContainer = connect({}, mapDispatchToProps)(Toast);

const Toasts = (props: ToastsContainerProps) => props.toasts.length ? props.toasts.map((text, id) => <ToastContainer text={text} id={id} />) : null;

const mapStateToProps = (state: Store.State) => ({
    toasts: state.toast.toastText
});

export const ToastsContainer = connect(mapStateToProps)(Toasts);
