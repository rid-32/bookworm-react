import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

//Actions
import { resetPasswordRequest } from '../../actions/auth';

// Components
import { Message } from 'semantic-ui-react';
import ForgotPasswordForm from '../forms/ForgotPasswordForm';

class ForgotPasswordPage extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    resetPasswordRequest: PropTypes.func.isRequired,
  };

  state = {
    success: false,
  }

  submit = data => this.props.resetPasswordRequest(data)
    .then(() => this.setState({ success: true }));

  render() {
    return (
      <div>
        { this.state.success ? (
          <Message>Email has been sent.</Message>
        ) : (
          <ForgotPasswordForm submit={this.submit} />
        ) }
      </div>
    );
  }
}

export default connect(null, { resetPasswordRequest })(ForgotPasswordPage);
