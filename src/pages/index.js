import { Component } from 'react';
import './index.css';
/**
 * title: Index Page
 * Routes:
 *   - ./src/routes/list.js
 */
export default class Index extends Component{
  render() {
    return this.props.children;
  }
}
