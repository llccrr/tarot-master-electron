import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const BackButton = ({ linkTo, ...props }) => (
  <div {...props} style={styles.backButton}>
    <Link to={linkTo}>
      <i className="fa fa-arrow-left fa-3x" />
    </Link>
  </div>
);

BackButton.propTypes = {
  linkTo: PropTypes.string.isRequired
};

const styles = {
  backButton: {
    position: 'fixed',
    top: '20px',
    left: '20px'
  }
};
