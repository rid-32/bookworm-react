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

// Удаление токена из локального хранилища браузера и удаление пользователя из состояния
export const logout = () => dispatch => {
        localStorage.removeItem('bookwormJWT');
        dispatch(userLoggedOut());
      };

// Подтверждение email. Если токен верен, то осуществляется автоматический вход на сайт
export const confirm = token => dispatch =>
  api.user.confirm(token)
    .then(user => {
      localStorage.bookwormJWT = user.token;
      dispatch(userLoggedIn(user));
    });

// Запрос на изменение пароля. Если указанный email есть в БД, то сервер отправляет на него ссылку с токеном
// Если такого email нет или email не подтверждён, то сервер отправляет нам ошибку
export const resetPasswordRequest = ({ email }) => () =>
  api.user.resetPasswordRequest(email);

// Передача токена из email серверу для изменения пароля
export const validateToken = token => () =>
  api.user.validateToken(token);

// Передача серверу нового пароля и токена для изменения пароля
export const resetPassword = data => () =>
  api.user.resetPassword(data);
