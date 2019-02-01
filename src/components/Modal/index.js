import { Component } from 'react';
import ReactDOM from 'react-dom'
import './index.scss'
let containerDOM = null, containerElement = null;
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = { };
    }
    defaultContain() {
        const { title, content, confirmText } = this.props
        return (
            <div className="defaultContain">
                <div className="title"> {title} </div>
                <div className="content">{content}</div>
                <div className="button" onClick={this.close}>
                    {confirmText ? confirmText : '确定'}
                </div>
            </div>
        )
    }
    close = () => {
        const { onClose } = this.props
        containerDOM && document.body.removeChild(containerDOM);
        containerDOM = null;
        containerElement = null;
        typeof onClose === 'function' && onClose()
    }
    render() {
        const { children, show } = this.props;
        const modalStyle = {
            display: show? 'flex': 'none'
        }
        return (
            <div className={`quModal`} style={modalStyle}>
                <div className={`mask`}></div>
                <div className={`content`}>
                    { children ? children : this.defaultContain()}
                </div>
            </div>
        );
    }
}
Index.show = function (opt) {
    if (!containerDOM) {
        containerDOM = document.createElement('div');
        containerDOM.className = 'quModal';
        document.body.appendChild(containerDOM);
    }
    containerElement = ReactDOM.render(<Index {...opt} />, containerDOM);
}
Index.close = ( ) => {
    containerDOM && document.body.removeChild(containerDOM);
    containerDOM = null;
    containerElement = null;
}
Index.defaultProps = {
    show: true
}
export default Index