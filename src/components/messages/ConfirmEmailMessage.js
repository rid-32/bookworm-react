import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { Message } from 'semantic-ui-react';

class ConfirmEmailMessage extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };

  render() {
    return (
      <Message info>
        <Message.Header>Please, verify your email to unlock awesomeness</Message.Header>
      </Message>
    );
  }
}

export default ConfirmEmailMessage;
