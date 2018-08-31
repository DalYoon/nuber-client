import React from "react";
import { Mutation } from "react-apollo";
import { RouteComponentProps } from "react-router";
import { facebookConnect, facebookConnectVariables } from "../../types/api";
import SocialLoginPresenter from "./SocialLoginPresenter";
import { FACEBOOK_CONNECT } from "./SocialLoginQueries";

class LoginMutation extends Mutation<facebookConnect, facebookConnectVariables> {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  firstName: string;
  lastName: string;
  email?: string;
  fbId: string;
}

class SocialLoginContainer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      email: "",
      fbId: "",
      firstName: "",
      lastName: ""
    };
  }

  public render() {
    const { email, fbId, firstName, lastName } = this.state;
    return (
      <LoginMutation
        mutation={FACEBOOK_CONNECT}
        variables={{
          email,
          fbId,
          firstName,
          lastName
        }}
      >
        {(mutation, { loading }) => <SocialLoginPresenter />}
      </LoginMutation>
    );
  }
}

export default SocialLoginContainer;
