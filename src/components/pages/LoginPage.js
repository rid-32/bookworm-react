// Компонент страницы входа на сайт

import React, { Component} from 'react';
import PropTypes from 'prop-types';
// Подключение объекта состояние к компоненту страницы входа
// import { connect } from 'react-redux';

// Components
import LoginForm from '../forms/LoginForm';

class LoginPage extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    // dispatch: PropTypes.func.isRequired,
  };

  submit = (data) => {
    console.log('data: ', data);
  }

  // Сам по себе этот компонент просто отображает компонент формы
  render() {
    return (
      <div>
        <h1>Login Page</h1>

        <LoginForm submit={this.submit} />
      </div>
    );
  }
}

// function mapDispatchToProps(dispatch) {
//   return {
//     submit: (data) => {
//       dispatch();
//     },
//   };
// }

// export default connect(null, mapDispatchToProps)(LoginPage);
export default LoginPage;
