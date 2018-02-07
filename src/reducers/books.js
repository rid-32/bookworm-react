// Модуль создания селекторов
import { createSelector } from 'reselect';

// Reducer
export default function books(state = {}, action = {}) {
  switch(action.type) {
    default: return state;
  }
}

// SELECTORS

// Селектор - это простая выборка из redux-состояния
// Ниже показан общий синтаксис
export const booksSelector = state => state.books;

// Теперь простую выборку необходимо преобразовать соответствующим образом
// Например, объект объектов преобразовать в массив значений этого объекта
// Для этого используется функция createSelector. Она возвращает функцию, принимающую redux-состояние
// Сам же createSelector принимает селекторы и последним аргументом функцию, которая выполняет окончательные преобразования
// и возвращает полученный результат
export const allBooksSelector = createSelector(
  booksSelector,
  booksHash => Object.values(booksHash)
);
