import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

//components
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import DashboardPage from './components/pages/DashboardPage';
import SignupPage from './components/pages/SignupPage';
import ConfirmationPage from './components/pages/ConfirmationPage';
import ForgotPasswordPage from './components/pages/ForgotPasswordPage';
import ResetPasswordPage from './components/pages/ResetPasswordPage';
import TopNavigation from './components/navigation/TopNavigation';
import NewBookPage from './components/pages/NewBookPage';
// Пользовательские маршруты, которые отображаются не только в зависимости от history,
// но и от того, вошел ли пользователь или нет
import UserRoute from './components/routes/UserRoute';
import GuestRoute from './components/routes/GuestRoute';

//styles
import './less/App.less';

// PropTypes.shape мы используем вместо PropTypes.object, который соответстует
// любым данным, а не только конкретному объекту к определёнными свойствами
export class App extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    isAuthenticated: PropTypes.bool.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  };

  // Внутрь пользовательских маршрутов мы передаём свойство location, чтобы
  // в дальнейшем это свойство было передано компоненту <Route />
  render() {
    const { location, isAuthenticated } = this.props;
    return (
      <div className='ui container'>
        { isAuthenticated && <TopNavigation location={location}/> }
        <Route location={location} path='/' exact component={HomePage} />
        <Route location={location} path='/confirmation/:token' exact component={ConfirmationPage} />
        <GuestRoute location={location} path='/login' component={LoginPage} />
        <GuestRoute location={location} path='/signup' component={SignupPage} />
        <GuestRoute location={location} path='/forgot_password' component={ForgotPasswordPage} />
        <GuestRoute location={location} path='/reset_password/:token' component={ResetPasswordPage} />
        <UserRoute location={location} path='/dashboard' component={DashboardPage} />
        <UserRoute location={location} path='/books/new' component={NewBookPage} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.email,
  };
}

export default connect(mapStateToProps)(App);
