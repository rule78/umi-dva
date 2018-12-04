import { Component } from 'react';
class Header extends Component{
  render() {
    return (
        <div className={'text'}>打包{this.props.content}</div>
    );
  }
}

module.exports = Header