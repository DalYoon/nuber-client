import React from "react";
import { Mutation, MutationFn } from "react-apollo";
import { RouteComponentProps } from "react-router";
import { toast } from "react-toastify";
import { startPhoneVerification, startPhoneVerificationVariables } from "../../types/api";
import PhoneLoginPresenter from "./PhoneLoginPresenter";
import { PHONE_SIGN_IN } from "./PhoneQueries";

interface IState {
  countryCode: string;
  phoneNumber: string;
}

class PhoneSignInMutation extends Mutation<
  startPhoneVerification,
  startPhoneVerificationVariables
> {}

class PhoneLoginContainer extends React.Component<RouteComponentProps<any>, IState> {
  public phoneMutation: MutationFn;

  public state = {
    countryCode: "+82",
    phoneNumber: ""
  };

  public render() {
    const { countryCode, phoneNumber } = this.state;
    return (
      <PhoneSignInMutation
        mutation={PHONE_SIGN_IN}
        variables={{ phoneNumber: `${countryCode}${phoneNumber}` }}
        onCompleted={this.handlePhoneSigninComplete}
      >
        {(phoneMutation, { loading }) => {
          this.phoneMutation = phoneMutation;

          return (
            <PhoneLoginPresenter
              countryCode={countryCode}
              phoneNumber={phoneNumber}
              onInputChange={this.onInputChange}
              onSubmit={this.onSubmit}
              loading={loading}
            />
          );
        }}
      </PhoneSignInMutation>
    );
  }

  public onInputChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = event => {
    const {
      target: { value, name }
    } = event;
    this.setState({
      [name]: value
    } as any);
  };

  public onSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    const { countryCode, phoneNumber } = this.state;
    event.preventDefault();
    const phone = `${countryCode}${phoneNumber}`;
    const isValid = /^\+[0-9]{2}[0-9]{7,11}$/.test(phone);

    if (isValid) {
      this.phoneMutation();
    } else {
      toast.error("please write a phone number!");
    }
  };

  public handlePhoneSigninComplete = data => {
    const { StartPhoneVerification } = data;
    const { countryCode, phoneNumber } = this.state;
    const { history } = this.props;

    const phone = `${countryCode}${phoneNumber}`;

    if (StartPhoneVerification.ok) {
      toast.success("We Sent SMS Message For You, Redirecting...");

      setTimeout(() => {
        history.push({
          pathname: "/verify-phone",
          state: {
            phoneNumber: phone
          }
        });
      }, 2000);
    } else {
      toast.error(StartPhoneVerification.error);
    }
  };
}

export default PhoneLoginContainer;
