import React from "react";
import { Mutation, MutationFn } from "react-apollo";
import { RouteComponentProps } from "react-router";
import { toast } from "react-toastify";
import {
  skipVerification,
  skipVerificationVariables,
  verifyPhone,
  verifyPhoneVariables
} from "../../types/api";

import { LOG_USER_IN } from "../../sharedQueries.local";
import { SKIP_VERIFICATION, VERIFY_PHONE } from "./VerifyPhoneQueries";

import VerifyPhonePresenter from "./VerifyPhonePresenter";

interface IState {
  verificationKey: string;
  phoneNumber: string;
}

interface IProps extends RouteComponentProps<any> {}

class VerifyMutation extends Mutation<verifyPhone, verifyPhoneVariables> {}
class SkipVerificationMutation extends Mutation<skipVerification, skipVerificationVariables> {}

class VerifyPhoneContainer extends React.Component<IProps, IState> {
  public logUserIn: MutationFn;

  constructor(props: IProps) {
    super(props);

    if (!props.location.state) {
      props.history.push("/");
    }

    this.state = {
      phoneNumber: props.location.state.phoneNumber,
      verificationKey: "whatever"
    };
  }

  public render() {
    const { verificationKey, phoneNumber } = this.state;
    return (
      <Mutation mutation={LOG_USER_IN}>
        {logUserIn => {
          this.logUserIn = logUserIn;
          return (
            <VerifyMutation
              mutation={VERIFY_PHONE}
              variables={{
                key: verificationKey,
                phoneNumber
              }}
              // onCompleted={this.handleVerifyCompleted}
            >
              {(mutation, { loading }) => {
                return (
                  <SkipVerificationMutation
                    mutation={SKIP_VERIFICATION}
                    variables={{ phoneNumber }}
                    onCompleted={this.handleVerifyCompleted}
                  >
                    {skipVerificationFn => {
                      return (
                        <VerifyPhonePresenter
                          onSubmit={skipVerificationFn}
                          onChange={this.onInputChange}
                          verificationKey={verificationKey}
                          loading={loading}
                        />
                      );
                    }}
                  </SkipVerificationMutation>
                );
              }}
            </VerifyMutation>
          );
        }}
      </Mutation>
    );
  }

  public onInputChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { name, value }
    } = event;

    this.setState({
      [name]: value
    } as any);
  };

  public handleVerifyCompleted = data => {
    const { SkipPhoneVerification } = data;
    const { history } = this.props;
    const { phoneNumber } = this.state;

    if (SkipPhoneVerification) {
      if (SkipPhoneVerification.ok) {
        toast.success("Yey! Verification completed!");

        setTimeout(() => {
          history.push({
            pathname: "/sign-up",
            state: {
              phoneNumber
            }
          });
        }, 2000);
      } else {
        toast.error(SkipPhoneVerification.error);
      }
    }
  };

  // public handleVerifyCompleted = data => {
  //   const { CompletePhoneVerification } = data;

  //   if (CompletePhoneVerification.ok) {
  //     if (CompletePhoneVerification.token) {
  //       this.logUserIn({
  //         variables: {
  //           token: CompletePhoneVerification.token
  //         }
  //       });
  //     }
  //     toast.success("verification has been done");
  //   } else {
  //     toast.error(CompletePhoneVerification.error);
  //   }
  // };
}

export default VerifyPhoneContainer;
