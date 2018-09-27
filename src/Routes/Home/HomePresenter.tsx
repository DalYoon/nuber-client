import React from "react";
import { MutationFn } from "react-apollo";
import Helmet from "react-helmet";
import Sidebar from "react-sidebar";
import styled from "../../typed-components";

import AddressBar from "../../Components/AddressBar";
import Button from "../../Components/Button";
import Menu from "../../Components/Menu";
import RidePopUp from "../../Components/RidePopUp";
import { getRides, myProfile } from "../../types/api";

const Container = styled.div``;

const MenuButton = styled.button`
  appearance: none;
  padding: 10px;
  position: absolute;
  top: 10px;
  left: 10px;
  text-align: center;
  font-weight: 800;
  border: 0;
  cursor: pointer;
  font-size: 20px;
  transform: rotate(90deg);
  z-index: 2;
  background-color: transparent;
`;

const Map = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
`;

const ExtendedButton = styled(Button)`
  position: absolute;
  bottom: 50px;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 10;
  height: auto;
  width: 80%;
`;

const RequestButton = ExtendedButton.extend`
  bottom: 130px;
`;

interface IProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  loading: boolean;
  mapRef: any;
  toAddress: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onAddressSubmit: any;
  price?: number;
  data?: myProfile;
  requestRideFn: MutationFn;
  nearbyRide?: getRides;
  acceptRideFn: MutationFn;
}

const Home: React.SFC<IProps> = ({
  isMenuOpen,
  toggleMenu,
  loading,
  mapRef,
  toAddress,
  onInputChange,
  onAddressSubmit,
  price,
  data: { GetMyProfile: { user = null } = {} } = {},
  requestRideFn,
  nearbyRide: { GetNearbyRide: { ride = null } = {} } = {},
  acceptRideFn
}) => {
  return (
    <Container>
      <Helmet>
        <title>Home | Nuber</title>
      </Helmet>
      <Sidebar
        sidebar={<Menu />}
        open={isMenuOpen}
        onSetOpen={toggleMenu}
        styles={{
          sidebar: {
            background: "white",
            width: "80%",
            zIndex: "10"
          }
        }}
      >
        {!loading && <MenuButton onClick={() => toggleMenu()}>|||</MenuButton>}
        {user &&
          !user.isDriving && (
            <React.Fragment>
              <AddressBar
                name={"toAddress"}
                value={toAddress}
                onChange={onInputChange}
                placeholder={"type address"}
                onBlur={() => null}
              />
              {price && (
                <RequestButton
                  onClick={requestRideFn}
                  disabled={toAddress === ""}
                  value={`Request A Ride ($${price})`}
                />
              )}
              <ExtendedButton
                onClick={onAddressSubmit}
                disabled={toAddress === ""}
                value={price ? "Change Address" : "Pick Address"}
              />
            </React.Fragment>
          )}
        {ride && (
          <RidePopUp
            id={ride.id}
            pickUpAddress={ride.pickUpAddress}
            dropOffAddress={ride.dropOffAddress}
            price={ride.price}
            distance={ride.distance}
            passengerName={ride.passenger.fullName!}
            passengerPhoto={ride.passenger.profilePhoto!}
            acceptRideFn={acceptRideFn}
          />
        )}
        <Map innerRef={mapRef} />
      </Sidebar>
    </Container>
  );
};

export default Home;
