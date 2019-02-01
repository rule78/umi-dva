import { Component } from 'react';
import Modal from 'components/Modal'
import Toast from 'components/Toast'
import './index.scss'
class User extends Component{
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
}
  componentDidMount(){
    Toast.show('服务异常，请稍后在搞', 1)
    // Modal.show({
    //   title: '标题啊',
    //   content: '这是文本内容'
    // });
  }
  toast(){
    Toast.show('服务异常，请稍后在搞', 1)
  }
  closeModal(){
    this.setState({
      showModal: false
    })
  }
  showModal(){
    this.setState({
      showModal: true
    })
  }
  render() {
    const { showModal } = this.state
    return (
        <div className={'a'} >
          {/* <p onClick={()=>{this.showModal()}}>登录页</p> */}
          <p onClick={()=>{this.toast()}}>toast</p>
            {/* <Modal show={showModal}>
              <div className="test" onClick={()=>{this.closeModal()}}>测试内容</div>
            </Modal> */}
        </div>
    );
  }
}

export default User