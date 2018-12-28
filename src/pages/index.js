import { Component } from 'react';
import './index.css';
/**
 * title: Index Page
 * Routes:
 *   - ./list/index.js
 */
export default class Index extends Component{
  render() {
    return this.props.children;
  }
}
