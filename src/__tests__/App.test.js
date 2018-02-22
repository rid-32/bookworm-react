import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import ConnactedApp, { App } from '../App';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

const mockStore = configureStore();

describe('App component with redux store', () => {
  const initialState = {
    user: {
      email: 'email@email.com',
    },
    books: {},
  };

  const location = {
    pathname: '/',
  };

  let wrapper, store;

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = mount(
      <Router>
        <Provider store={store}>
          <ConnactedApp location={location} />
        </Provider>
      </Router>
    );
  });

  it('is rendered normally', () => {
    expect(wrapper.find(App).length).toBe(1);
  });

  it('should get location prop', () => {
    expect(wrapper.find(App).prop('location')).toEqual(location);
  });

  it('should get isAuthenticated prop', () => {
    expect(wrapper.find(App).prop('isAuthenticated')).toBeDefined();
  });

  it('has TopNavigation component if isAuthenticated', () => {
    expect(wrapper.find('TopNavigation').length).toBe(1);
  });
});
