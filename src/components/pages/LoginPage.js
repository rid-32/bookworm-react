// Компонент страницы входа на сайт

import React, { Component} from 'react';
import PropTypes from 'prop-types';
// Подключение объекта состояние к компоненту страницы входа
import { connect } from 'react-redux';

// Actions
import { login } from '../../actions/auth';

// Components
import LoginForm from '../forms/LoginForm';

class LoginPage extends Component {
  // Свойства, которые передаются от родительского компонента
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }),
    login: PropTypes.func.isRequired,
  };

  // При отправке данных на сервер успешные ответы обрабатываются в LoginPage компоненте,
  // а ошибки перехватываются уже в LoginForm
  submit = (data) =>
    this.props.login(data).then(
      () => this.props.history.push('/')
    );

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

// export default connect(null, mapDispatchToProps)(LoginPage);
export default connect(null, {login})(LoginPage);
