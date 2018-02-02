import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
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

if (localStorage.bookwormJWT) {
  const user = { token: localStorage.bookwormJWT };
  store.dispatch(userLoggedIn(user));
}

ReactDOM.render(
  <Router>
    <Provider store={store}>
     <App />
    </Provider>
  </Router>,
  document.getElementById('root')
);
registerServiceWorker();
