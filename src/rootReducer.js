// combineReducers разбивает один корневой reducer на несколько
// и каждый из них работает только с определённой частью redux-состояния
import { combineReducers } from 'redux';

// Редюсеры, из которых собирается корневой reducer
import user from './reducers/user';
import books from './reducers/books';

export default combineReducers({
  user,
  books,
});
