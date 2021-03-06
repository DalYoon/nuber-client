import React from "react";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import styled from "../../typed-components";

import { getPlaces } from "../../types/api";

import Header from "../../Components/Header";
import Place from "../../Components/Place";

const Container = styled.div`
  padding: 0 40px;
`;

const SLink = styled(Link)`
  text-decoration: underline;
`;

interface IProps {
  data?: getPlaces;
  loading: boolean;
}

const PlacesPresenter: React.SFC<IProps> = ({
  data: { GetMyPlaces: { places = null } = {} } = {},
  loading
}) => (
  <React.Fragment>
    <Helmet>
      <title>Places | Nuber</title>
    </Helmet>
    <Header title="Places" backTo="/nuber-client" />
    <Container>
      {!loading &&
        places &&
        places.map(place => (
          <Place
            key={place!.id}
            id={place!.id}
            fav={place!.isFav}
            name={place!.name}
            address={place!.address}
          />
        ))}
      {!loading && places && <SLink to="/add-place">Add Place</SLink>}
    </Container>
  </React.Fragment>
);

export default PlacesPresenter;
