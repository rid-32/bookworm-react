import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Get URL to a Gravatar image from an email
import gravatarUrl from 'gravatar-url';

// Components
import { Menu, Dropdown, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

// Actions
import { logout } from '../../actions/auth';

class TopNavigation extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    logout: PropTypes.func.isRequired,
    user: PropTypes.shape({
      email: PropTypes.string.isRequired,
    }).isRequired,
  };

  render() {
    const { user, logout, location } = this.props;

    return (
      <Menu secondary pointing>
        { location.pathname === "/dashboard" ? (
            <Menu.Item as={Link} to="/">Home</Menu.Item>
          ) : (
            <Menu.Item as={Link} to="/dashboard">Dashboard</Menu.Item>
          )
        }

        <Menu.Menu position="right">
          <Dropdown trigger={<Image avatar src={gravatarUrl(user.email)} /> }>
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
  };
}

export default connect(mapStateToProps, { logout })(TopNavigation);
