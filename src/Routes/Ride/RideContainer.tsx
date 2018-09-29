import React from "react";
import { Query } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { getRide, getRideVariables } from "../../types/api";
import { GET_RIDE } from "./RideQueries";

import RidePresenter from "./RidePresenter";

interface IProps extends RouteComponentProps<any> {}

class RideQuery extends Query<getRide, getRideVariables> {}

class RideContainer extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);

    if (!props.match.params.rideId) {
      props.history.push("/");
    }
  }

  public render() {
    const {
      match: {
        params: { rideId }
      }
    } = this.props;
    return (
      <RideQuery query={GET_RIDE} variables={{ rideId }}>
        {data => <RidePresenter />}
      </RideQuery>
    );
  }
}

export default RideContainer;
