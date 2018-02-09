import React, { Component} from 'react';
import PropTypes from 'prop-types';
import urlencode from 'urlencode';

// Components
import { Form, Button, Segment, Grid, Image } from 'semantic-ui-react';
import InlineError from '../messages/InlineError';

class BookForm extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    submit: PropTypes.func.isRequired,
    book: PropTypes.shape({
      goodreadsId: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      authors: PropTypes.string.isRequired,
      covers: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      pages: PropTypes.number,
    }).isRequired,
  };

// В объекте состояния хранятся данные из полей формы
  state = {
    data: {
      goodreadsId: this.props.book.goodreadsId,
      title: this.props.book.title,
      authors: this.props.book.authors,
      cover: this.props.book.covers[0],
      pages: this.props.book.pages,
    },
    covers: this.props.book.covers,
    index: 0,
    loading: false,
    errors: {},
  }

// Данный метод будет вызываться каждый раз, когда компонент получает новые свойства
// Здесь это нужно, чтобы изменять состояние компонента, ведь при получении новых свойств
// состояние не будет меняться автоматически
  componentWillReceiveProps(props) {
    this.setState({
      data: {
        goodreadsId: props.book.goodreadsId,
        title: props.book.title,
        authors: props.book.authors,
        cover: props.book.covers[0],
        pages: props.book.pages,
      },
      covers: props.book.covers,
    });
  }

// Изменяем состояние объекта при изменении значения поля формы
  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onChangeNumber = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: parseInt(e.target.value, 10) }
    });

// Проверяем введённые пользователем данные на наличие ошибок
// и обновляем объект состояния
  onSubmit = e => {
    e.preventDefault();

    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      // Показываем индикатор загрузки в начале отправки запроса на сервер
      this.setState({ loading: true });
      // В этом компоненте перехватываюся все ошибки, поступающие от сервера,
      // в результате xhr-запроса
      // Ошибки сохраняются в свойстве errors состояния компонента LoginForm
      this.props.submit(this.state.data)
        .catch(err =>
          this.setState({ errors: err.response.data.errors, loading: false })
        );
    }
  };

  changeCover = () => {
    const { index, covers } = this.state;
    const newIndex = index + 1 >= covers.length ? 0 : index + 1;
    this.setState({
      index: newIndex,
      data: { ...this.state.data, cover: covers[newIndex] }
    });
  }

  validate = data => {
    const errors = {};
    if (!data.title) {
      errors.title = 'Can`t be blank';
    }
    if (!data.authors) {
      errors.authors = 'Can`t be blank';
    }
    if (!data.pages) {
      errors.pages = 'Can`t be blank';
    }
    return errors;
  };

  render() {
    const { errors, data, loading } = this.state;

    return (
      <Segment>
        <Form onSubmit={this.onSubmit} loading={loading}>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column>
                <Form.Field error={!!errors.title}>
                  <label htmlFor="title">Book Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Title"
                    value={data.title}
                    onChange={this.onChange}
                  />
                  { errors.title && <InlineError text={errors.title} /> }
                </Form.Field>

                <Form.Field error={!!errors.authors}>
                  <label htmlFor="authors">Book Authors</label>
                  <input
                    type="text"
                    id="authors"
                    name="authors"
                    placeholder="Authors"
                    value={data.authors}
                    onChange={this.onChange}
                  />
                  { errors.authors && <InlineError text={errors.authors} /> }
                </Form.Field>

                <Form.Field error={!!errors.pages}>
                  <label htmlFor="pages">Pages</label>
                  <input
                    disabled={data.pages === undefined}
                    type="text"
                    id="pages"
                    name="pages"
                    value={data.pages !== undefined ? data.pages : 'Loading...'}
                    onChange={this.onChangeNumber}
                  />
                  { errors.pages && <InlineError text={errors.pages} /> }
                </Form.Field>
              </Grid.Column>

              <Grid.Column>
                <a href={'https://www.goodreads.com/book/title?id=' + urlencode(data.title)} target="_blank" style={{ display: 'table' }}>
                  <Image size="small" src={data.cover} />
                </a>
                { this.state.covers.length > 1 && <a role="button" tabIndex={0}
                  onClick={this.changeCover}>Another cover</a>
                }
              </Grid.Column>

            </Grid.Row>
            <Grid.Row>
              <Button primary>Save</Button>
            </Grid.Row>
          </Grid>
        </Form>
      </Segment>
    );
  }
}

export default BookForm;
