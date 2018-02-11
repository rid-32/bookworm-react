import React from 'react';
import PropTypes from 'prop-types';
import urlencode from 'urlencode';

// Components
import { Grid, Card, Image } from 'semantic-ui-react';

const BookShelf = ({ books }) => (
  <Grid container columns="equal">
    { books.map(book => (
      <Grid.Column width={4} key={book.goodreadsId}>
        <Card>
          <a href={'https://www.goodreads.com/book/title?id=' + urlencode(book.title)} target="_blank" style={{ display: 'table', margin: '0 auto' }}>
            <Image src={book.cover} />
          </a>
          <Card.Content>
            <Card.Header>{book.title}</Card.Header>
            <Card.Meta>{book.authors}</Card.Meta>
            <Card.Content extra>{`${book.pages} pages`}</Card.Content>
          </Card.Content>
        </Card>
      </Grid.Column>
    )) }
  </Grid>
);

BookShelf.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      authors: PropTypes.string.isRequired,
      cover: PropTypes.string.isRequired,
      pages: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      goodreadsId: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
}

export default BookShelf;
