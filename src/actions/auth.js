// В types.js хранятся все action.type-ы
import { USER_LOGGED_IN, USER_LOGGED_OUT } from '../types';
// В api.js хранятся асинхронные action-creator-ы для обработки
// промежуточным ПО redux-thunk
import api from '../api';

// Action-creator для редюсера user.js для установки свойства user состояния
export const userLoggedIn = (user) => ({
  type: USER_LOGGED_IN,
  user
});

// Action-creator для удаления пользователя из состояния
export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT
});

// Login action, которое диспатчит userLoggedIn() action-creator
export const login = (credentials) => dispatch =>
    api.user.login(credentials)
      .then(user => {
        localStorage.bookwormJWT = user.token;
        dispatch(userLoggedIn(user));
      });

export const logout = () => dispatch => {
        localStorage.removeItem('bookwormJWT');
        dispatch(userLoggedOut());
      };

export const confirm = token => dispatch =>
  api.user.confirm(token)
    .then(user => {
      localStorage.bookwormJWT = user.token;
      dispatch(userLoggedIn(user));
    });
