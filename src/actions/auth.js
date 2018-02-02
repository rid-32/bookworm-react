// В types.js хранятся все action.type-ы
import { USER_LOGGED_IN } from '../types';
// В api.js хранятся асинхронные action-creator-ы для обработки
// промежуточным ПО redux-thunk
import api from '../api';

// Action-creator для редюсера user.js для установки свойства user состояния
export const userLoggedIn = (user) => ({
  type: USER_LOGGED_IN,
  user
});

// Login action, которое диспатчит userLoggedIn() action-creator
export const login = (credentials) => dispatch =>
    api.user.login(credentials)
      .then(user => dispatch(userLoggedIn(user)));
