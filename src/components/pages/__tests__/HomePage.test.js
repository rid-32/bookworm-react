import React from 'react';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';

// Components
import { Provider } from 'react-redux';
import HomePage from '../HomePage';
import { BrowserRouter as Router } from 'react-router-dom';

const mockStore = configureStore();

const initialState = {
  user: {
    token: '',
  },
};

const store = mockStore(initialState);

function PageObject(component) {
  this.HomePageComponent = () => component.find('HomePage');
}

describe('HomePage', () => {
  const wrapper = mount(
    <Router>
      <Provider store={store}>
        <HomePage />
      </Provider>
    </Router>
  );

  const { HomePageComponent } = new PageObject(wrapper);

  it('is rendered normally', () => {
    expect(HomePageComponent().length).toBe(1);
  })

  it('has isAuthenticated prop', () => {
    expect(HomePageComponent().prop('isAuthenticated')).toBeDefined();
  });

  it('should render Login link if isAuthenticated prop is false', () => {
    expect(HomePageComponent().find('Link').at(0).text()).toEqual('Login');
  });
})
