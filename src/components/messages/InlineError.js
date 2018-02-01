import React, { Component} from 'react';
import PropTypes from 'prop-types';

class InlineError extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    text: PropTypes.string.isRequired,
  };

  render() {
    return (
      <span style={{ color: "#ae5856" }}>
        { this.props.text }
      </span>
    );
  }
}

export default InlineError;
