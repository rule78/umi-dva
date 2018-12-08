import { Component } from 'react';
class User extends Component{
  render() {
    const imgUrl = require('./../../assets/yay.jpg')
    return (
        <div className={'text'}>登录页<img src={imgUrl}/></div>
    );
  }
}

export default User