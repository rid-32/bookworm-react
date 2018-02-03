// Домашняя страница сайта

import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Actions
import * as actions from '../../actions/auth';

class HomePage extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    isAuthenticated: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
  };

  // В зависимости от того, вошел ли пользователь, отображается или кнопка Login,
  // или кнопка Logout
  render() {
    const { isAuthenticated, logout } = this.props;
    return (
      <div>
        <h1>Home Page</h1>
        { isAuthenticated ? (
          <button onClick={() => logout()}>Logout</button>
        ) : (
          <div>
            <Link to='/login'>Login</Link> or <Link to='/signup'>Sign Up</Link>
          </div>
        ) }
      </div>
    );
  }
}

// Флаг isAuthenticated говорит о том, осуществил ли пользователь вход на сайт или нет
function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token
  };
}

export default connect(mapStateToProps, { logout: actions.logout })(HomePage);
