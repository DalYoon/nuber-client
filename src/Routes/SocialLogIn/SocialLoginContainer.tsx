import React from "react";
import { Mutation, MutationFn } from "react-apollo";
import { RouteComponentProps } from "react-router";
import { toast } from "react-toastify";
import { facebookConnect, facebookConnectVariables } from "../../types/api";
import SocialLoginPresenter from "./SocialLoginPresenter";
import { FACEBOOK_CONNECT } from "./SocialLoginQueries";

class LoginMutation extends Mutation<facebookConnect, facebookConnectVariables> {}

interface IProps extends RouteComponentProps<any> {}

class SocialLoginContainer extends React.Component<IProps> {
  public facebookMutation: MutationFn;

  public render() {
    return (
      <LoginMutation mutation={FACEBOOK_CONNECT}>
        {(facebookMutation, { loading }) => {
          this.facebookMutation = facebookMutation;
          return <SocialLoginPresenter loginCallback={this.loginCallback} />;
        }}
      </LoginMutation>
    );
  }

  public loginCallback = fbData => {
    console.log(fbData);
    const { email, first_name, last_name, id, name, accessToken } = fbData;

    if (accessToken) {
      toast.success(`welcome ${name}!`);
      this.facebookMutation({
        variables: {
          email,
          fbId: id,
          firstName: first_name,
          lastName: last_name
        }
      });
    } else {
      toast.error("log in failed :( ");
    }
  };
}

export default SocialLoginContainer;
