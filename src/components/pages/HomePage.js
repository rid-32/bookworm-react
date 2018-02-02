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

  render() {
    const { isAuthenticated, logout } = this.props;
    return (
      <div>
        <h1>Home Page</h1>
        { isAuthenticated ? <button onClick={() => logout()}>Logout</button> : <Link to='/login'>Login</Link> }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token
  };
}

export default connect(mapStateToProps, { logout: actions.logout })(HomePage);
