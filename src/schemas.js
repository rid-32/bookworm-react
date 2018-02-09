// Схемы для нормализации данных с помощью модуля normalizr

import { schema } from 'normalizr';

// Схема данных с книгами, полученными от сервера
export const bookSchema = new schema.Entity(
  'books',
  {},
  { idAttribute: '_id' }
);
