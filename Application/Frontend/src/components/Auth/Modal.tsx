import * as React from "react";
import * as ReactDOM from "react-dom";

const root = document.getElementById("root");

export class Modal extends React.Component {
    private el: HTMLDivElement;
    private modalRoot: HTMLDivElement;

    constructor(props) {
        super(props);
        const modalRoot = document.createElement("div");

        modalRoot.style.cssText = "position: relative; z-index: 999";

        document.body.appendChild(modalRoot);

        this.modalRoot = modalRoot;
        this.el = document.createElement('div');
    }

    public componentDidMount(): void {
        this.modalRoot.appendChild(this.el);
        document.body.style.cssText = "overflow: hidden";
        root.style.cssText = "filter: blur(5px)";
    }

    componentWillUnmount() {
        this.modalRoot.removeChild(this.el);
        document.body.removeChild(this.modalRoot);
        document.body.style.cssText = "";
        root.style.cssText = "";
    }

    render() {
        return ReactDOM.createPortal(
            this.props.children,
            this.el,
        );
    }
}
