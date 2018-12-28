import { Component } from 'react';
import Modal from 'components/Modal'
import './index.scss'
class User extends Component{
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
}
  componentDidMount(){
    // Modal.show({
    //   title: '标题啊',
    //   content: '这是文本内容'
    // });
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
          <p onClick={()=>{this.showModal()}}>登录页</p>
            <Modal show={showModal}>
              <div className="test" onClick={()=>{this.closeModal()}}>测试内容</div>
            </Modal>
        </div>
    );
  }
}

export default User