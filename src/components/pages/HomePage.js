// Домашняя страница сайта

import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class HomePage extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };

  render() {
    return (
      <div>
        <h1>Home Page</h1>
        <Link to='/login'>Login</Link>
      </div>
    );
  }
}

export default HomePage;
