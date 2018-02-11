// Домашняя страница сайта

import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';

class HomePage extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    isAuthenticated: PropTypes.bool.isRequired,
  };

  // В зависимости от того, вошел ли пользователь, отображается или кнопка Login,
  // или кнопка Logout
  render() {
    const { isAuthenticated } = this.props;
    return (
      <div>
        <h1>Home Page</h1>
        { !isAuthenticated &&
          <div>
            <Link to='/login'>Login</Link> or <Link to='/signup'>Sign Up</Link>
            <Segment>
              <span>User: john@mail.com</span><br />
              <span>Password: password</span>
            </Segment>
          </div>
        }
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

export default connect(mapStateToProps)(HomePage);
