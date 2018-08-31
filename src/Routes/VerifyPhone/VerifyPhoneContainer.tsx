import React from "react";
import { Mutation } from "react-apollo";
import { RouteComponentProps } from "react-router";
import { toast } from "react-toastify";
import { verifyPhone, verifyPhoneVariables } from "../../types/api";

import { LOG_USER_IN } from "../../sharedQueries.local";
import { VERIFY_PHONE } from "./VerifyPhoneQueries";

import VerifyPhonePresenter from "./VerifyPhonePresenter";

interface IState {
  verificationKey: string;
  phoneNumber: string;
}

interface IProps extends RouteComponentProps<any> {}

class VerifyMutation extends Mutation<verifyPhone, verifyPhoneVariables> {}

class VerifyPhoneContainer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    if (!props.location.state) {
      props.history.push("/");
    }

    this.state = {
      phoneNumber: props.location.state.phoneNumber,
      verificationKey: ""
    };
  }

  public render() {
    const { verificationKey, phoneNumber } = this.state;
    return (
      <Mutation mutation={LOG_USER_IN}>
        {logUserIn => (
          <VerifyMutation
            mutation={VERIFY_PHONE}
            variables={{
              key: verificationKey,
              phoneNumber
            }}
            onCompleted={data => {
              const { CompletePhoneVerification } = data;

              if (CompletePhoneVerification.ok) {
                if (CompletePhoneVerification.token) {
                  logUserIn({
                    variables: {
                      token: CompletePhoneVerification.token
                    }
                  });
                }
                toast.success("verification has been done");
              } else {
                toast.error(CompletePhoneVerification.error);
              }
            }}
          >
            {(mutation, { loading }) => {
              return (
                <VerifyPhonePresenter
                  onSubmit={mutation}
                  onChange={this.onInputChange}
                  verificationKey={verificationKey}
                  loading={loading}
                />
              );
            }}
          </VerifyMutation>
        )}
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
}

export default VerifyPhoneContainer;
