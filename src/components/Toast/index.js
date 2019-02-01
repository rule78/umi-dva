import { Component } from 'react';
import ReactDOM from 'react-dom'
import './index.scss'
let toastContainerDOM = null, toastContainerElement = null;
const isNumber = (obj) =>{ 
    return (typeof obj==='number')&&obj.constructor==Number; 
} 
class Toast extends Component {
    constructor(props) {
        super(props);
        this.state = { };
    }
    componentDidMount(){
        const { time } = this.props;
        let _this = this
        setTimeout(()=>{ _this.close() },time*1000)
    }
    close = () => {
        const { onClose } = this.props
        toastContainerDOM && document.body.removeChild(toastContainerDOM);
        toastContainerDOM = null;
        toastContainerElement = null;
        typeof onClose === 'function' && onClose()
    }
    render() {
        const { msg, time } = this.props;
        let contentStyle ={
            animationDuration: `${time}s`
        }
        return (
            <div className={`quToast`} >
                <div className={`mask`}></div>
                <div className={`content`} style={contentStyle}>{msg}</div>
            </div>
        );
    }
}
Toast.show = function () {
    let option = {}
    if (!toastContainerDOM) {
        toastContainerDOM = document.createElement('div');
        toastContainerDOM.className = 'quToast';
        document.body.appendChild(toastContainerDOM);
    }
    option['msg'] = arguments[0]
    if (arguments.length > 1) {
      option['time'] = parseInt(arguments[1])
    }
    toastContainerElement = ReactDOM.render(<Toast {...option} />, toastContainerDOM);
}
Toast.close = ( ) => {
    toastContainerDOM && document.body.removeChild(toastContainerDOM);
    toastContainerDOM = null;
    toastContainerElement = null;
}
Toast.defaultProps = {
    msg: '啊啊啊啊倒萨',
    time: 1.5
}
export default Toast