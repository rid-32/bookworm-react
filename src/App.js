import React, { Component } from 'react';
import { Route } from 'react-router-dom';

//components
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';

//styles
import './less/App.less';

class App extends Component {
  render() {
    return (
      <div className='ui container'>
        <Route path='/' exact component={HomePage} />
        <Route path='/login' exact component={LoginPage} />
      </div>
    );
  }
}

export default App;
