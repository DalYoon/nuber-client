import React from "react";
import { Mutation } from "react-apollo";
import { RouteComponentProps } from "react-router";
import { verifyPhone, verifyPhoneVariables } from "../../types/api";
import { VERIFY_PHONE } from "./VerifyPhoneQueries";

import VerifyPhonePresenter from "./VerifyPhonePresenter";

interface IState {
  key: string;
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
      key: "",
      phoneNumber: props.location.state.phoneNumber
    };
  }

  public render() {
    const { key, phoneNumber } = this.state;
    return (
      <VerifyMutation
        mutation={VERIFY_PHONE}
        variables={{
          key,
          phoneNumber
        }}
      >
        {(mutation, { loading }) => {
          return (
            <VerifyPhonePresenter
            // verificationKey={key}
            // onChange={}
            // onSubmit={}
            // loading={loading}
            />
          );
        }}
      </VerifyMutation>
    );
  }
}

export default VerifyPhoneContainer;
