import React from "react";
// import { Query } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
// import { getRide, getRideVariables } from "../../types/api";

import RidePresenter from "./RidePresenter";

interface IProps extends RouteComponentProps<any> {}

// class GetRideQuery extends Query<getRide, getRideVariables> {}

class RideContainer extends React.Component<any, IProps> {
  public render() {
    return <RidePresenter />;
  }
}

export default RideContainer;
