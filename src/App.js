import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

//components
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import DashboardPage from './components/pages/DashboardPage';
// Пользовательские маршруты, которые отображаются не только в зависимости от history,
// но и от того, вошел ли пользователь или нет
import UserRoute from './components/routes/UserRoute';
import GuestRoute from './components/routes/GuestRoute';

//styles
import './less/App.less';

// PropTypes.shape мы используем вместо PropTypes.object, который соответстует
// любым данным, а не только конкретному объекту к определёнными свойствами
class App extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  };

  // Внутрь пользовательских маршрутов мы передаём свойство location, чтобы
  // в дальнейшем это свойство было передано компоненту <Route />
  render() {
    const { location } = this.props;
    return (
      <div className='ui container'>
        <Route location={location} path='/' exact component={HomePage} />
        <GuestRoute location={location} path='/login' component={LoginPage} />
        <UserRoute location={location} path='/dashboard' component={DashboardPage} />
      </div>
    );
  }
}

export default App;
