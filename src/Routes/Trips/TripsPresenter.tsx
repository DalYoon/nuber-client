import React from "react";
import Helmet from "react-helmet";
import styled from "../../typed-components";

import { getRideHistory } from "../../types/api";

import Header from "../../Components/Header";
import RideList from "../../Components/RideList";

const Container = styled.div``;

const ToggleOptions = styled.ul`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Btn = styled<{ selected: boolean }, any>("li")`
  width: 100px;
  height: 30px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: ${props => (props.selected ? "black" : "rgba(0, 0, 0, 0.5)")};
`;

interface IProps {
  selectDriverOption: () => void;
  selectPassengerOption: () => void;
  selectedOption: number;
  rideHistoryData?: getRideHistory;
  loading: boolean;
}

const TripsPresenter: React.SFC<IProps> = ({
  selectedOption,
  selectDriverOption,
  selectPassengerOption,
  rideHistoryData: { GetRideHistory: { ridesAsDriver = [], ridesAsPassenger = [] } = {} } = {}
}) => {
  console.log(ridesAsDriver);
  console.log(ridesAsPassenger);
  return (
    <Container>
      <Helmet>
        <title>My Trips | Nuber</title>
      </Helmet>
      <Header title={"My Trips"} backTo={"/"} />
      <ToggleOptions>
        <Btn onClick={selectDriverOption} selected={selectedOption === 0}>
          Drivers
        </Btn>
        <Btn onClick={selectPassengerOption} selected={selectedOption === 1}>
          Passengers
        </Btn>
      </ToggleOptions>
      {selectedOption === 1 && <RideList rideDatas={ridesAsPassenger} />}
      {selectedOption === 0 && <RideList rideDatas={ridesAsDriver} />}
    </Container>
  );
};

export default TripsPresenter;
