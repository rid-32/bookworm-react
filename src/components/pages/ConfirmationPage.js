import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Components
import { Message, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

// Actions
import { confirm } from '../../actions/auth.js';

class ConfirmationPage extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    confirm: PropTypes.func.isRequired,
 };

  state = {
    loading: true,
    success: false,
  }

  componentDidMount() {
    this.props.confirm(this.props.match.params.token)
      .then(() => this.setState({
        loading: false,
        success: true,
      }))
      .catch(() => this.setState({
        loading: false,
        success: false,
      }));
  }

  render() {
    const { loading, success } = this.state;
    return (
      <div>

        {loading && (
          <Message icon>
            <Icon name='circle notched' loading />
            <Message.Header>Validating your email</Message.Header>
          </Message>
        )}

        {!loading && success && (
          <Message success icon>
            <Icon name='checkmark' />
            <Message.Content>
              <Message.Header>Thank you. Your account has been verified</Message.Header>
              <Link to="/dashboard">Go to your dashboard</Link>
            </Message.Content>
          </Message>
        )}

        {!loading && !success && (
          <Message negative icon>
            <Icon name='warning sign' />
            <Message.Content>
              <Message.Header>Ooops. Invalid token it seems.</Message.Header>
            </Message.Content>
          </Message>
        )}

      </div>
    );
  }
}

export default connect(null, { confirm })(ConfirmationPage);
