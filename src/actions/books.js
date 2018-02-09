import api from '../api';
import { BOOKS_FETCHED, BOOK_CREATED } from '../types';
// Модуль нормализации данных с книгами
import { normalize } from 'normalizr';

// Схема для нормализации
import { bookSchema } from '../schemas';

// data.entities.books
export const booksFetched = data => ({
  type: BOOKS_FETCHED,
  data,
});

export const bookCreated = data => ({
  type: BOOK_CREATED,
  data,
});

// Перед тем, как диспатчить данные в состояние, необходимо нормолизовать данные с
// полученными книгами с помощью модуля normalizr
//
export const fetchBooks = () => dispatch =>
  api.books.fetchAll()
    .then(books => dispatch(booksFetched(normalize(books, [bookSchema]))));

// Действие создания новой книги
export const createBook = data => dispatch =>
  api.books.create(data)
    .then(book => dispatch(bookCreated(normalize(book, bookSchema))));
