import React, { Component} from 'react';
import PropTypes from 'prop-types';
import isEmail from 'validator/lib/isEmail';

// Components
import { Form, Button, Message } from 'semantic-ui-react';
import InlineError from '../messages/InlineError';

class ForgotPasswordForm extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    submit: PropTypes.func.isRequired,
  };

// В объекте состояния хранятся данные из полей формы
  state = {
    data: {
      email: '',
    },
    loading: false,
    errors: {},
  }

// Изменяем состояние объекта при изменении значения поля формы
  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

// Проверяем введённые пользователем данные на наличие ошибок
// и обновляем объект состояния
  onSubmit = e => {
    e.preventDefault();

    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      // Показываем индикатор загрузки в начале отправки запроса на сервер
      this.setState({ loading: true });
      // В этом компоненте перехватываюся все ошибки, поступающие от сервера,
      // в результате xhr-запроса
      // Ошибки сохраняются в свойстве errors состояния компонента LoginForm
      this.props.submit(this.state.data)
        .catch(err =>
          this.setState({ errors: err.response.data.errors, loading: false })
        );
    }
  };

  validate = data => {
    const errors = {};
    if (!isEmail(data.email)) {
      errors.email = 'Invalid email';
    }
    return errors;
  };

  render() {
    const { errors, data, loading } = this.state;

    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        { !!errors.global && <Message negative>{errors.global}</Message> }
        <Form.Field error={!!errors.email}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="email@email.com"
            value={data.email}
            onChange={this.onChange}
          />
          { errors.email && <InlineError text={errors.email} /> }
        </Form.Field>
        <Button primary>Send</Button>
      </Form>
    );
  }
}

export default ForgotPasswordForm;
