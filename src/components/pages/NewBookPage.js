import React, { Component} from 'react';
import PropTypes from 'prop-types';

// Components
import { Segment } from 'semantic-ui-react';
import SearchBookForm from '../forms/SearchBookForm';
import BookForm from '../forms/BookForm';

class NewBookPage extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };

  state = {
    book:  null,
  }

  onBookSelect = book => this.setState({ book });

  addBook = () => console.log('hi');

  render() {
    return (
      <Segment>
        <h1>Add new book to your collection</h1>
        <SearchBookForm onBookSelect={this.onBookSelect} />

        { this.state.book && <BookForm submit={this.addBook} book={this.state.book} /> }
      </Segment>
    );
  }
}

export default NewBookPage;
