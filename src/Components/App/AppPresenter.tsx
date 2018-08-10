import PropTypes from "prop-types";
import React, { SFC } from "react";

interface IProps {
  isLoggedIn: boolean;
}

const AppPresenter: SFC<IProps> = ({ isLoggedIn }) =>
  isLoggedIn ? <span>You are logged in</span> : <span>You are logged out</span>;

AppPresenter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

export default AppPresenter;
