// Action-creator для помещения данных пользователя в состояние
import { userLoggedIn } from './auth';
// API для взаимодействия с сервером, т.е. отправка xhr-запроса
import api from '../api';

// Модуль установки заголовка с токеном авторизации
import setAuthorizationHeader from '../utils/setAuthorizationHeader';

// Thunk-action
export const signup = data => dispatch =>
  api.user.signup(data).then(user => {
    localStorage.bookwormJWT = user.token;
    setAuthorizationHeader(user.token);
    dispatch(userLoggedIn(user))
  });
