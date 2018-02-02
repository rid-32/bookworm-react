// combineReducers разбивает один корневой reducer на несколько
// и каждый из них работает только с определённой частью redux-состояния
import { combineReducers } from 'redux';

// Редюсеры, из которых собирается корневой reducer
import user from './reducers/user';

export default combineReducers({
  user
});
