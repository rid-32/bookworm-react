import React, { Component} from 'react';
import PropTypes from 'prop-types';

// Components
import { Form, Button } from 'semantic-ui-react';
import InlineError from '../messages/InlineError';

class ResetPasswordForm extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    submit: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
  };

// В объекте состояния хранятся данные из полей формы
  state = {
    data: {
      token: this.props.token,
      password: '',
      passwordConfirmation: '',
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
    if (!data.password) {
      errors.password = 'Can`t be blank';
    }
    if (data.password !== data.passwordConfirmation) {
      errors.passwordConfirmation = 'Passwords must match';
    }
    return errors;
  };

  render() {
    const { errors, data, loading } = this.state;

    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        <Form.Field error={!!errors.password}>
          <label htmlFor="password">New Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Your new password"
            value={data.password}
            onChange={this.onChange}
          />
          { errors.password && <InlineError text={errors.password} /> }
        </Form.Field>
        <Form.Field error={!!errors.passwordConfirmation}>
          <label htmlFor="passwordConfirmation">Confirm your new password</label>
          <input
            type="password"
            id="passwordConfirmation"
            name="passwordConfirmation"
            placeholder="Type it again, please"
            value={data.passwordConfirmation}
            onChange={this.onChange}
          />
          { errors.passwordConfirmation && <InlineError text={errors.passwordConfirmation} /> }
        </Form.Field>
        <Button primary>Reset</Button>
      </Form>
    );
  }
}

export default ResetPasswordForm;
