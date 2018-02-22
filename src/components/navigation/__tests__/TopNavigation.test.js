import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';

// Component
import ConnectedTopNavigation, { TopNavigation } from '../TopNavigation';

const mockStore = configureStore();

// Данный шаблон наиболее полезен для тестирования форм с большим кол-вом полей
function PageObject(component) {
  this.TopNavigation = () => component.find('TopNavigation');
  this.MenuItem = () => component.find('MenuItem');
  this.DropdownItem = () => component.find('DropdownItem');
}

function componentWrapper(pathname) {

  const initialState = {
    user: {
      email: 'email@main.com',
    },
    books: {
      '__book_identifier__': {
        _id: '1a35t',
        goodreadsId: '1234',
        title: 'Title',
        authors: 'Author Name',
        cover: 'Cover URL',
        pages: 123,
        userId: '1a2b3c4d'
      }
    },
  };

  const location = {
    pathname
  };

  let store = mockStore(initialState);

  return mount(
    <Router>
      <Provider store={store}>
        <ConnectedTopNavigation location={location} />
      </Provider>
    </Router>
  );
}

describe('ConnectedTopNavigation component', () => {

  const wrapper = componentWrapper('/');

  const { TopNavigation } = new PageObject(wrapper);

  it('is rendered normally', () => {
    expect(TopNavigation().length).toBe(1);
  })

  it('has logout prop', () => {
    expect(TopNavigation().prop('logout')).toBeDefined();
  })

  it('has location prop', () => {
    expect(TopNavigation().prop('location')).toBeDefined();
  })

  it('has hasBooks prop', () => {
    expect(TopNavigation().prop('hasBooks')).toBeDefined();
  })

  it('has user prop', () => {
    expect(TopNavigation().prop('user')).toBeDefined();
  })
});

describe('ConnectedTopNavigation children', () => {

  it('MenuItem "Dashboard" is rendered if pathname === "/"', () => {

    const wrapper = componentWrapper('/');

    const { MenuItem } = new PageObject(wrapper);

    expect(MenuItem().at(0).text()).toEqual('Dashboard');
  })

  it('MenuItem "Home" is rendered if pathname === "/dashboard"', () => {

    const wrapper = componentWrapper('/dashboard');

    const { MenuItem } = new PageObject(wrapper);

    expect(MenuItem().at(0).text()).toEqual('Home');
  })

  it('MenuItem "Add new book" is rendered if "hasBooks" prop is true and pathname === "/books/new"', () => {

    const wrapper = componentWrapper('/books/new');

    const { MenuItem } = new PageObject(wrapper);

    expect(MenuItem().at(1).text()).toEqual('Add new book');
  })
});

describe('stupid TopNavigation component', () => {

  it('should call logout function after emitting click event on DropdownItem component', () => {

    const logout = jest.fn();

    const wrapper = shallow(
      <TopNavigation logout={logout} hasBooks={false} user={{email: 'some'}} location={{pathname: '/'}} />
    );

    const { DropdownItem } = new PageObject(wrapper);

    DropdownItem().simulate('click');

    expect(logout.mock.calls.length).toBe(1);
  })
});
