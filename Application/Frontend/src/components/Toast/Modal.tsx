import * as React from "react";
import * as ReactDOM from "react-dom";
// @ts-ignore
const root: HTMLDivElement = document.getElementById("root");

interface Props {
    children: JSX.Element;
}

export class Modal extends React.Component<Props> {
    private el: HTMLDivElement;
    private modalRoot: HTMLDivElement;

    constructor(props: Props) {
        super(props);
        const modalRoot = document.createElement("div");

        modalRoot.style.cssText = "position: absolute; right: 50px; top: 50px; z-index: 1000";

        document.body.appendChild(modalRoot);

        this.modalRoot = modalRoot;
        this.el = document.createElement('div');
    }

    public componentDidMount(): void {
        this.modalRoot.appendChild(this.el);
    }

    componentWillUnmount() {
        this.modalRoot.removeChild(this.el);
        document.body.removeChild(this.modalRoot);
    }

    render() {
        return ReactDOM.createPortal(
            this.props.children,
            this.el,
        );
    }
}
