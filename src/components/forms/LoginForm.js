// Форма для входа на сайт

import React, { Component} from 'react';
import PropTypes from 'prop-types';
// Для проверки корректности email на стороне клиента
import Validator from 'validator';

// Components
import { Form, Button } from 'semantic-ui-react';
import InlineError from '../messages/InlineError';

class LoginForm extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };

// В объекте состояния хранятся данные из полей формы
// Эти же значения и присваиваются в качестве значений полей формы, т.е.
// когда изменяется значение поля формы, это значение через метод onChange
// сохраняется в состоянии, а уже из состояния присваивается полю формы
  constructor(props) {
    super(props);
    this.state = {
      data: {           // данные полей формы
        email: '',
        password: '',
      },
      loading: false,   // устанавливается в true при отправке данных на сервер,
                        // что позволяет отображать индикатор загрузки
      errors: {},       // объект ошибок при проверке формы на стороне клиента
    };
  }

  // Изменяем состояние объекта при изменении значения поля формы
  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  // Проверяем введённые пользователем данные на наличие ошибок
  // и обновляем объект состояния
  onSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.props.submit(this.state.data);
    }
  };

  validate = (data) => {
    const errors = {};
    if (!Validator.isEmail(data.email)) {
      errors.email = 'Invalid email';
    }
    if (!data.password) {
      errors.password = 'Can`t be blank';
    }

    return errors;
  };

  render() {
    // Деконструируем объект состояния
    const { data, errors } = this.state;
    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Field>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="example@example.com"
            value={data.email}
            onChange={this.onChange}
          />
          { errors.email && <InlineError text={errors.email} /> }
        </Form.Field>
        <Form.Field>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Make it secure"
            value={data.password}
            onChange={this.onChange}
          />
          { errors.password && <InlineError text={errors.password} /> }
        </Form.Field>
        <Button primary>Login</Button>
      </Form>
    );
  }
}

export default LoginForm;
