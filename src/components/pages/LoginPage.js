import React, { Component} from 'react';
import PropTypes from 'prop-types';

class LoginPage extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };

  render() {
    return (
      <div>
        <h1>Login Page</h1>
      </div>
    );
  }
}

export default LoginPage;
