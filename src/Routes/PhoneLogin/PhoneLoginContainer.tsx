import PropTypes from "prop-types";
import React from "react";
import { RouteComponentProps } from "react-router";
import PhoneLoginPresenter from "./PhoneLoginPresenter";

interface IState {
  countryCode: string;
  phoneNumber: string;
}

class PhoneLoginContainer extends React.Component<RouteComponentProps<any>, IState> {
  public state = {
    countryCode: "+82",
    phoneNumber: "12345"
  };

  public render() {
    const { countryCode, phoneNumber } = this.state;
    return <PhoneLoginPresenter countryCode={countryCode} phoneNumber={phoneNumber} />;
  }
}

PhoneLoginPresenter.propTypes = {
  countryCode: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired
};

export default PhoneLoginContainer;
