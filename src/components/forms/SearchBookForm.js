import React, { Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

// Components
import { Form, Dropdown } from 'semantic-ui-react';

class SearchBookForm extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    onBookSelect: PropTypes.func.isRequired,
  };

  state = {
    query: '',
    loading: false,
    options: [],
    books: {},
  }

  onSearchChange = (e, data) => {
    clearTimeout(this.timer);
    this.setState({
      query: data.searchQuery,
    });
    this.timer = setTimeout(this.fetchOptions, 1000);
  }

  fetchOptions = () => {
    if (!this.state.query) return;
    this.setState({ loading: true });
    axios.get(`/api/books/search?q=${this.state.query}`)
      .then(res => res.data.books)
      .then(books => {
        const options = [];
        const booksHash = {};
        books.forEach(book => {
          booksHash[book.goodreadsId] = book;
          options.push({
            key: book.goodreadsId,
            value: book.goodreadsId,
            text: book.title,
          });
        });
        this.setState({ loading: false, options, books: booksHash });
      });
  }

  onChange = (e, data) => {
    this.setState({ query: data.value });
    this.props.onBookSelect(this.state.books[data.value]);
  }

  render() {
    return (
      <Form>
        <Dropdown
          search
          fluid
          placeholder="Search fora book by title"
          onSearchChange={this.onSearchChange}
          onChange={this.onChange}
          options={this.state.options}
          loading={this.state.loading}
        />
      </Form>
    );
  }
}

export default SearchBookForm;
