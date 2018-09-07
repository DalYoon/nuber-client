import React from "react";
import { Mutation, Query } from "react-apollo";
import { RouteComponentProps } from "react-router";

import { myProfile, updateProfile, updateProfileVariables } from "../../types/api";

import { USER_PROFILE } from "../../sharedQueries";
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
class UserProfileQuery extends Query<myProfile> {}

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
      <UserProfileQuery query={USER_PROFILE} onCompleted={this.updateField}>
        {() => (
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
        )}
      </UserProfileQuery>
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

  public updateField = (data: {} | myProfile) => {
    if ("GetMyProfile" in data) {
      const {
        GetMyProfile: { user }
      } = data;
      if (user !== null) {
        const { firstName, lastName, email, profilePhoto } = user;

        this.setState({
          email,
          firstName,
          lastName,
          profilePhoto
        } as any);
      }
    }
  };
}

export default EditAccountContainer;
