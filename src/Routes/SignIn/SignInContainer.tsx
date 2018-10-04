import React from "react";
import { Mutation, MutationFn } from "react-apollo";
import { RouteComponentProps } from "react-router";
import { toast } from "react-toastify";

import { LOG_USER_IN } from "../../sharedQueries.local";
import { emailSignIn, emailSignInVariables } from "../../types/api";
import { EMAIL_SIGN_IN } from "./SignInQueries";

import SignInPresenter from "./SignInPresenter";

interface IProps extends RouteComponentProps<any> {}
interface IState {
  email: string;
  password: string;
}
class EmailSignInMutation extends Mutation<emailSignIn, emailSignInVariables> {}

class SignInContainer extends React.Component<IProps, IState> {
  public emailSigninFn: MutationFn;
  public logUserInFn: MutationFn;
  public state = {
    email: "",
    password: ""
  };

  public render() {
    const { email, password } = this.state;
    return (
      <EmailSignInMutation mutation={EMAIL_SIGN_IN} onCompleted={this.handleSigninCompleted}>
        {emailSigninFn => {
          this.emailSigninFn = emailSigninFn;
          return (
            <Mutation mutation={LOG_USER_IN}>
              {logUserInFn => {
                this.logUserInFn = logUserInFn;
                return (
                  <SignInPresenter
                    email={email}
                    password={password}
                    onInputChange={this.onInputChange}
                    onSubmit={this.onSubmit}
                  />
                );
              }}
            </Mutation>
          );
        }}
      </EmailSignInMutation>
    );
  }

  public onInputChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { value, name }
    } = event;

    this.setState({
      [name]: value
    } as any);
  };

  public onSubmit = () => {
    const { email, password } = this.state;

    this.emailSigninFn({
      variables: {
        email,
        password
      }
    });
  };

  public handleSigninCompleted = (data: emailSignIn) => {
    const { history } = this.props;
    const {
      EmailSignIn: { ok, error, token }
    } = data;

    if (ok) {
      this.logUserInFn({ variables: { token } });

      toast.success("Welcome!");

      setTimeout(() => {
        history.push({
          pathname: "/nuber-client"
        });
      }, 2000);
    } else {
      toast.error(error);
    }
  };
}

export default SignInContainer;
