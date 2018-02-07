// Страница пользователя, выполнившего вход

import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Components
import AddBookCta from '../ctas/AddBookCta';

// Messages
import ConfirmEmailMessage from '../messages/ConfirmEmailMessage';

// Other
import { allBooksSelector } from '../../reducers/books';

// Если email не подтверждён, то выводится сообщение об этом
class DashboardPage extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    isConfirmed: PropTypes.bool.isRequired,
    books: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired).isRequired,
  };

  render() {
    const { isConfirmed, books } = this.props;
    return (
      <div>
        { !isConfirmed && <ConfirmEmailMessage />  }

        { books.length === 0 && <AddBookCta /> }
      </div>
    );
  }
}

// isConfirmed - это флаг подтверждённого пользователем email`а
function mapStateToProps(state) {
  return {
    isConfirmed: !!state.user.confirmed,
    books: allBooksSelector(state),
  };
}

export default connect(mapStateToProps)(DashboardPage);
