import React from "react";
import styled from "../../typed-components";

import Helmet from "react-helmet";
import Button from "../../Components/Button";
import Form from "../../Components/Form";
import Header from "../../Components/Header";
import Input from "../../Components/Input";

const Container = styled.div``;

const ExtendedForm = styled(Form)`
  padding: 0px 40px;
`;

const ExtendedInput = styled(Input)`
  margin-bottom: 30px;
`;

interface IProps {
  email: string;
  password: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

const SignInPresenter: React.SFC<IProps> = ({ email, password, onInputChange, onSubmit }) => (
  <Container>
    <Helmet>
      <title>Sign Up | Nuber</title>
    </Helmet>
    <Header title={"Sign In"} backTo={"/nuber-client"} />
    <ExtendedForm submitFn={onSubmit}>
      <ExtendedInput
        type="email"
        name="email"
        value={email}
        placeholder={"Email"}
        onChange={onInputChange}
      />
      <ExtendedInput
        type="password"
        name="password"
        value={password}
        placeholder={"Password"}
        onChange={onInputChange}
      />
      <Button value={"submit"} onClick={null} />
    </ExtendedForm>
  </Container>
);

export default SignInPresenter;
