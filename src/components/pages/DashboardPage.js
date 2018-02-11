// Страница пользователя, выполнившего вход

import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Actions
import { fetchBooks } from '../../actions/books';

// Components
import AddBookCta from '../ctas/AddBookCta';
import BookShelf from '../ctas/BookShelf';
import { Dimmer, Loader } from 'semantic-ui-react';

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
    fetchBooks: PropTypes.func.isRequired,
    books: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired).isRequired,
  };

  state = {
    loading: true,
  }

  componentDidMount = () => this.onInit(this.props)
    .then(() => this.setState({ loading: false }));

  onInit = (props) => props.fetchBooks();

  render() {
    const { isConfirmed, books } = this.props;
    const { loading } = this.state;

    return (
      <div>
        { !isConfirmed && <ConfirmEmailMessage />  }
        { loading ? (
          <Dimmer active inverted>
            <Loader />
          </Dimmer>
        ) : (
          <div>
            { books.length === 0 ? <AddBookCta /> : <BookShelf books={books} /> }
          </div>
        ) }
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

export default connect(mapStateToProps, { fetchBooks })(DashboardPage);
