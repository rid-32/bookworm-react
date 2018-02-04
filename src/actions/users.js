// Action-creator для помещения данных пользователя в состояние
import { userLoggedIn } from './auth';
// API для взаимодействия с сервером, т.е. отправка xhr-запроса
import api from '../api';

// Thunk-action
export const signup = data => dispatch =>
  api.user.signup(data).then(user => {
    localStorage.bookwormJWT = user.token;
    dispatch(userLoggedIn(user))
  });
