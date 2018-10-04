import React from "react";
import styled from "../../typed-components";

import Helmet from "react-helmet";
import Button from "../../Components/Button";
import Form from "../../Components/Form";
import Header from "../../Components/Header";
import Input from "../../Components/Input";
import PhotoInput from "../../Components/PhotoInput";

const Container = styled.div``;

const ExtendedForm = styled(Form)`
  padding: 0px 40px;
`;

const ExtendedInput = styled(Input)`
  margin-bottom: 30px;
`;

const FakeInput = styled.input`
  border: none;
  border-bottom: 2px solid ${props => props.theme.greyColor};
  font-size: 20px;
  width: 100%;
  padding-bottom: 10px;
  font-weight: 500;
  transition: border-bottom 0.1s linear;
  &:-webkit-autofill {
    box-shadow: 0 0 0px 1000px white inset !important;
  }
  &:focus {
    border-bottom-color: #2c3e50;
    outline: none;
  }
  &::placeholder {
    color: ${props => props.theme.greyColor};
    font-weight: 300;
  }
  margin-bottom: 30px;
`;

interface IProps {
  firstName: string;
  lastName: string;
  email: string;
  password1: string;
  password2: string;
  profilePhoto: string;
  phoneNumber: string;
  uploading: boolean;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

const SignUpPresenter: React.SFC<IProps> = ({
  email,
  firstName,
  lastName,
  password1,
  password2,
  phoneNumber,
  profilePhoto,
  onInputChange,
  onSubmit,
  uploading
}) => (
  <Container>
    <Helmet>
      <title>Sign In | Nuber</title>
    </Helmet>
    <Header title={"Sign In"} backTo={"/nuber-client"} />
    <ExtendedForm submitFn={onSubmit}>
      <PhotoInput uploading={uploading} fileUrl={profilePhoto} onChange={onInputChange} />
      <ExtendedInput
        type="email"
        name="email"
        value={email}
        placeholder={"Email"}
        onChange={onInputChange}
      />
      <ExtendedInput
        type="password"
        name="password1"
        value={password1}
        placeholder={"Password"}
        onChange={onInputChange}
      />
      <ExtendedInput
        type="password"
        name="password2"
        value={password2}
        placeholder={"Confirm Password"}
        onChange={onInputChange}
      />
      <ExtendedInput
        type="text"
        name="firstName"
        value={firstName}
        placeholder={"First Name"}
        onChange={onInputChange}
      />
      <ExtendedInput
        type="text"
        name="lastName"
        value={lastName}
        placeholder={"Last Name"}
        onChange={onInputChange}
      />
      <FakeInput type="text" value={phoneNumber} placeholder={"Last Name"} readOnly={true} />
      <Button value={"submit"} onClick={null} />
    </ExtendedForm>
  </Container>
);

export default SignUpPresenter;
