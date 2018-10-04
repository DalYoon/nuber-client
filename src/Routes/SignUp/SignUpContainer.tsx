import axios from "axios";
import React from "react";
import { Mutation, MutationFn } from "react-apollo";
import { RouteComponentProps } from "react-router";
import { toast } from "react-toastify";

import { emailSignUp, emailSignUpVariables } from "../../types/api";
import { EMAIL_SIGN_UP } from "./SignUpQueries";

import SignUpPresenter from "./SignUpPresenter";

interface IProps extends RouteComponentProps<any> {}
interface IState {
  firstName: string;
  lastName: string;
  email: string;
  password1: string;
  password2: string;
  profilePhoto: string;
  uploading: boolean;
}

class EmailSignUpMutation extends Mutation<emailSignUp, emailSignUpVariables> {}

class SignUpContainer extends React.Component<IProps, IState> {
  public emailSignupFn: MutationFn;
  public state = {
    email: "",
    firstName: "",
    lastName: "",
    password1: "",
    password2: "",
    profilePhoto:
      "https://res.cloudinary.com/dbfkfuxui/image/upload/v1538539882/defaultProfile.png",
    uploading: false
  };

  public render() {
    const {
      location: {
        state: { phoneNumber }
      }
    } = this.props;
    const {
      email,
      firstName,
      lastName,
      password1,
      password2,
      profilePhoto,
      uploading
    } = this.state;
    return (
      <EmailSignUpMutation mutation={EMAIL_SIGN_UP} onCompleted={this.handleSigninCompleted}>
        {emailSignupFn => {
          this.emailSignupFn = emailSignupFn;
          return (
            <SignUpPresenter
              email={email}
              password1={password1}
              password2={password2}
              firstName={firstName}
              lastName={lastName}
              phoneNumber={phoneNumber}
              profilePhoto={profilePhoto}
              onInputChange={this.onInputChange}
              onSubmit={this.onSubmit}
              uploading={uploading}
            />
          );
        }}
      </EmailSignUpMutation>
    );
  }

  public onInputChange: React.ChangeEventHandler<HTMLInputElement> = async event => {
    const {
      target: { name, value, files }
    } = event;

    if (files) {
      this.setState({
        uploading: true
      });

      const formData = new FormData();
      formData.append("file", files[0]);
      formData.append("apy_key", "399141415383233");
      formData.append("upload_preset", "qqqqhsbx");
      formData.append("timestamp", String(Date.now() / 1000));

      const {
        data: { secure_url }
      } = await axios.post(`https://api.cloudinary.com/v1_1/dbfkfuxui/image/upload`, formData);

      this.setState({
        profilePhoto: secure_url,
        uploading: false
      });
    }

    this.setState({
      [name]: value
    } as any);
  };

  public onSubmit = () => {
    const {
      location: {
        state: { phoneNumber }
      }
    } = this.props;
    const { email, password1, password2, firstName, lastName, profilePhoto } = this.state;

    if (password1 !== password2) {
      toast.error("password and confirm password must be same");
      return;
    }

    this.emailSignupFn({
      variables: {
        age: 20,
        email,
        firstName,
        lastName,
        password: password1,
        phoneNumber,
        profilePhoto
      }
    });
  };

  public handleSigninCompleted = (data: emailSignUp) => {
    const { history } = this.props;
    const { EmailSignUp } = data;

    if (EmailSignUp.ok) {
      toast.success("You are signed up, please sign in with your account");

      setTimeout(() => {
        history.push({
          pathname: "/nuber-client"
        });
      }, 2000);
    } else {
      toast.error(EmailSignUp.error);
    }
  };
}

export default SignUpContainer;
