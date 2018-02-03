import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// applyMiddleware - функция использования промежуточного ПО для редюсеров
import { createStore, applyMiddleware } from 'redux';
// С помощью Provider хранилище передаётся внутрь компонентов
import { Provider } from 'react-redux';
// Промежуточное ПО обработки асинхронных процессов
// Когда мы диспатчим асинхронный action-creator обработчику thunk,
// он в свою очередь отслеживает выполнение асинхронного кода и только затем
// запускает distatch с указанным action
import thunk from 'redux-thunk';
// Расширение для просмотра redux-хранилища в браузере
import { composeWithDevTools } from 'redux-devtools-extension';

// Reducers
import rootReducer from './rootReducer';

//Actions
import { userLoggedIn } from './actions/auth';

// Main styles
import './less/index.css';
import 'semantic-ui-css/semantic.min.css';

// Components
import App from './App';

// Other
import registerServiceWorker from './registerServiceWorker';

// Создаём хранилище
const store = createStore(
  rootReducer,
  // Подключение расширения для браузера для просмотра redux-хранилища
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

// При первоначальной загрузке приложения проверяем, есть ли в локальном хранилище
// токен, который говорит нам, что пользователь уже осуществил вход на сайт ранее
// Если есть, то мы устанавливаем в redux-состоянии объект user c соответствующим
// токеном
if (localStorage.bookwormJWT) {
  const user = { token: localStorage.bookwormJWT };
  store.dispatch(userLoggedIn(user));
}

// Вместо простого <App /> мы используем <Route component={App}/> чтобы передать
// внутрь <App /> свойство location!!!!! Оно необходимо, чтобы внутри пользовательских
// маршрутов передавать информацию об browserHistory компонентам <Route />
ReactDOM.render(
  <Router>
    <Provider store={store}>
      <Route component={App} />
    </Provider>
  </Router>,
  document.getElementById('root')
);
registerServiceWorker();
