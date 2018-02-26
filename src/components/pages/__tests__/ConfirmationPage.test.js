import React from 'react';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';

// Components
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import ConfirmationPage from '../ConfirmationPage';

const middlewares = [thunk];

const mockStore = configureStore(middlewares);

const store = mockStore({});

function PageObject(component) {
  this.ConfirmationPageComponent = () => component.find('ConfirmationPage');
}

describe('ConfirmationPage', () => {
  const wrapper = mount(
    <Router>
      <Provider store={store}>
        <ConfirmationPage match={{
          params: {
            token: ''
          }
        }} />
      </Provider>
    </Router>
  );

  const { ConfirmationPageComponent } = new PageObject(wrapper);

  it('is rendered normally', () => {
    expect(ConfirmationPageComponent().length).toBe(1);
  });

  it('has confirm prop', () => {
    expect(ConfirmationPageComponent().prop('confirm')).toBeDefined();
  })

});
