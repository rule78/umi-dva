import { Component } from 'react';
import ReactDOM from 'react-dom'
import './index.scss'
import { ActivityIndicator } from 'antd-mobile';
let containerDOM = null, containerElement = null;
class Index extends Component {
    constructor(props) {
        super(props);
    }
    close() {
        containerDOM && document.body.removeChild(containerDOM);
        containerDOM = null;
        containerElement = null;
    }
    render() {
        return (
            <div className="loading-container">
                <ActivityIndicator size="large" color="white" className='loading'/>
            </div>
        )
    }
}
Index.close = function () {
    containerDOM && document.body.removeChild(containerDOM);
    containerDOM = null;
    containerElement = null;
}
Index.show = function (opt) {
    if (!containerDOM) {
        containerDOM = document.createElement('div');
        containerDOM.className = 'loading-container';
        document.body.appendChild(containerDOM);
    }
    containerElement = ReactDOM.render(<Index {...opt} />, containerDOM);
};
Index.defaultProps = {
}
export default Index