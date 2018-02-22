import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Get URL to a Gravatar image from an email
// import gravatarUrl from 'gravatar-url';

// Components
import { Menu, Dropdown, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

// Actions
import { logout } from '../../actions/auth';

// Selectors
import { allBooksSelector } from '../../reducers/books';

export class TopNavigation extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    logout: PropTypes.func.isRequired,
    hasBooks: PropTypes.bool.isRequired,
    user: PropTypes.shape({
      email: PropTypes.string.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  };

  render() {
    const { logout, location, hasBooks } = this.props;

    return (
      <Menu secondary pointing>
        { location.pathname === "/dashboard" ? (
            <Menu.Item as={Link} to="/">Home</Menu.Item>
          ) : (
            <Menu.Item as={Link} to="/dashboard">Dashboard</Menu.Item>
          )
        }
        { hasBooks && <Menu.Item as={Link} to="/books/new">Add new book</Menu.Item> }

        <Menu.Menu position="right">
          <Dropdown trigger={<Icon name="user circle outline" size="big" />}>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Menu>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    hasBooks: allBooksSelector(state).length > 0,
  };
}

export default connect(mapStateToProps, { logout })(TopNavigation);
