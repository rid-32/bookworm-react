// Страница пользователя, выполнившего вход

import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Messages
import ConfirmEmailMessage from '../messages/ConfirmEmailMessage';

// Если email не подтверждён, то выводится сообщение об этом
class DashboardPage extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    isConfirmed: PropTypes.bool.isRequired,
  };

  render() {
    const { isConfirmed } = this.props;
    return (
      <div>
        { !isConfirmed && <ConfirmEmailMessage />  }
      </div>
    );
  }
}

// isConfirmed - это флаг подтверждённого пользователем email`а
function mapStateToProps(state) {
  return {
    isConfirmed: !!state.user.confirmed,
  };
}

export default connect(mapStateToProps)(DashboardPage);
