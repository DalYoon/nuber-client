import React from "react";
import { MutationFn } from "react-apollo";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import styled from "../../typed-components";

import Header from "../../Components/Header";
import Place from "../../Components/Place";
import { myProfile } from "../../types/api";

const Container = styled.div`
  padding: 0px 40px;
`;

const Image = styled.img`
  height: 60px;
  width: 60px;
  border-radius: 50%;
`;

const GridLink = styled(Link)`
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-gap: 10px;
  margin-bottom: 10px;
`;

const Keys = styled.div``;

const Key = styled.span`
  display: block;
  margin-bottom: 5px;
`;

const FakeLink = styled.span`
  text-decoration: underline;
  cursor: pointer;
`;

const SLink = styled(Link)`
  display: block;
  text-decoration: underline;
  margin: 20px 0px;
`;

interface IProps {
  logUserOutFn: MutationFn;
  userData?: myProfile;
  userDataLoading: boolean;
}

const SettingsPresenter: React.SFC<IProps> = ({
  logUserOutFn,
  userData: { GetMyProfile: { user = null } = {} } = {},
  userDataLoading
}) => (
  <React.Fragment>
    <Helmet>
      <title>Settings | Nuber</title>
    </Helmet>
    <Header title={"Account Settings"} backTo={"/"} />
    <Container>
      <GridLink to="/edit-account">
        {!userDataLoading &&
          user &&
          user.profilePhoto &&
          user.fullName &&
          user.email && (
            <React.Fragment>
              <Image src={user.profilePhoto} />
              <Keys>
                <Key>{user.fullName}</Key>
                <Key>{user.email}</Key>
              </Keys>
            </React.Fragment>
          )}
      </GridLink>
      <Place fav={false} name={"Home"} address={"12345"} />
      <Place fav={false} name={"Home"} address={"12345"} />
      <Place fav={false} name={"Home"} address={"12345"} />
      <SLink to="/places">Go To Places</SLink>
      <FakeLink onClick={logUserOutFn as any}>Log Out</FakeLink>
    </Container>
  </React.Fragment>
);

export default SettingsPresenter;