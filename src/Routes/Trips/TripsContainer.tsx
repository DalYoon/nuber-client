import React from "react";
import { Query } from "react-apollo";
import { RouteComponentProps } from "react-router";

import { getRideHistory } from "../../types/api";

import TripsPresenter from "./TripsPresenter";
import { GET_RIDE_HISTORY } from "./TripsQueries";

interface IProps extends RouteComponentProps<any> {}

enum selectOptions {
  DRIVERS,
  PASSENGERS
}

interface IState {
  selectedOption: selectOptions;
}

class RideHistoryQuery extends Query<getRideHistory> {}

class TripsContainer extends React.Component<IProps, IState> {
  public state = {
    selectedOption: selectOptions.PASSENGERS
  };

  public render() {
    const { selectedOption } = this.state;
    return (
      <RideHistoryQuery query={GET_RIDE_HISTORY}>
        {({ data: rideHistoryData, loading }) => (
          <TripsPresenter
            selectedOption={selectedOption}
            selectDriverOption={this.selectDriverOption}
            selectPassengerOption={this.selectPassengerOption}
            rideHistoryData={rideHistoryData}
            loading={loading}
          />
        )}
      </RideHistoryQuery>
    );
  }

  public selectDriverOption = () => {
    this.setState({
      selectedOption: 0
    });
  };

  public selectPassengerOption = () => {
    this.setState({
      selectedOption: 1
    });
  };
}

export default TripsContainer;
