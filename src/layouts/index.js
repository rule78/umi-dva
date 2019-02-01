import { Component } from 'react';
import { connect } from 'dva';
import withRouter from 'umi/withRouter';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import './index.css';
class Layout extends Component {
  componentWillMount(){
    if(this.props.location.pathname === '/'){
      this.props.history.push('/init')
    }
  }
  //给iscroll腾个位置
  render() {
    const {children, location} = this.props
    return (
      <TransitionGroup>
        <CSSTransition key={location.pathname} 
          classNames="example"
          timeout={300}
        >
        <div style={{height: '100vh'}}>{ children }</div>
        </CSSTransition>
      </TransitionGroup>
    )
  }
}
export default withRouter(connect()(Layout))
