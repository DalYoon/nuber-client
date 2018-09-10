import React from "react";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import Button from "../../Components/Button";
import Form from "../../Components/Form";
import Header from "../../Components/Header";
import Input from "../../Components/Input";
import styled from "../../typed-components";

const Container = styled.div`
  padding: 0 40px;
`;

const ExtendedInput = styled(Input)`
  margin-bottom: 40px;
`;

const ExtendedLink = styled(Link)`
  text-decoration: underline;
  margin-bottom: 20px;
  display: block;
`;

interface IProps {
  address: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
}

const AddPlacePresenter: React.SFC<IProps> = ({ address, name, onChange }) => (
  <React.Fragment>
    <Helmet>
      <title>Add Place | Nuber</title>
    </Helmet>
    <Header title="Add Place" backTo="/" />
    <Container>
      <Form submitFn={null}>
        <ExtendedInput
          type="text"
          name="name"
          placeholder="name"
          value={name}
          onChange={onChange}
        />
        <ExtendedInput
          type="text"
          name="address"
          placeholder="address"
          value={address}
          onChange={onChange}
        />
        <ExtendedLink to="/find-address">Pick place from map</ExtendedLink>
        <Button value="Add Place" onClick={null} />
      </Form>
    </Container>
  </React.Fragment>
);

export default AddPlacePresenter;
