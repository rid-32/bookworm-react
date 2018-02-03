// Компонент пользовательского маршрута страницы гостя

import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// Все компоненты - это ФУНКЦИИ!!!!
class UserRoute extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    component: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
  };

  render() {
    const { isAuthenticated, component: Component, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props => !isAuthenticated ? <Component {...props} /> : <Redirect to="/dashboard" />}
      />
    );
  }
}

// Флаг isAuthenticated говорит о том, осуществил ли пользователь вход на сайт или нет
function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token,
  };
}

export default connect(mapStateToProps)(UserRoute);
