import React from "react";
import { Mutation } from "react-apollo";
import { RouteComponentProps } from "react-router";

import { updateProfile, updateProfileVariables } from "../../types/api";

import EditAccountPresenter from "./EditAccountPresenter";
import { UPDATE_PROFILE } from "./EditAccountQueries";

interface IProps extends RouteComponentProps<any> {}

interface IState {
  email: string;
  firstName: string;
  lastName: string;
  profilePhoto: string;
}

class UpdateProfileMutation extends Mutation<updateProfile, updateProfileVariables> {}

class EditAccountContainer extends React.Component<IProps, IState> {
  public state = {
    email: "",
    firstName: "",
    lastName: "",
    profilePhoto: ""
  };

  public render() {
    const { email, firstName, lastName, profilePhoto } = this.state;
    return (
      <UpdateProfileMutation
        mutation={UPDATE_PROFILE}
        variables={{
          email,
          firstName,
          lastName,
          profilePhoto
        }}
      >
        {(updateProfileFn, { loading }) => (
          <EditAccountPresenter
            email={email}
            firstName={firstName}
            lastName={lastName}
            profilePhoto={profilePhoto}
            onInputChange={this.onInputChange}
            loading={loading}
            onSubmit={updateProfileFn}
          />
        )}
      </UpdateProfileMutation>
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

export default EditAccountContainer;