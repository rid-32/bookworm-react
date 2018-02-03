// Страница регистрации нового пользователя

import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Actions
import { signup } from '../../actions/users';

// Components
import SignupForm from '../forms/SignupForm';

class SignupPage extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    signup: PropTypes.func.isRequired,
  };

  submit = (data) => this.props.signup(data)
    .then(() => this.props.history.push('/dashboard'));

  render() {
    return (
      <div>
        <h1>Signup Page</h1>
        <SignupForm submit={this.submit} />
      </div>
    );
  }
}

export default connect(null, { signup })(SignupPage);
