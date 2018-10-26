import { Component } from 'react';
import { connect } from 'dva';
import withRouter from 'umi/withRouter';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import './index.css';
class Layout extends Component {
  //给iscroll腾个位置
  render() {
    const {children, location} = this.props
    if (location.pathname === '/login') {
      return <div style={{height: '100vh'}}>{ children }</div>
    }
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
