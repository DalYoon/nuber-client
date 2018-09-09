import axios from "axios";
import React from "react";
import { Mutation, Query } from "react-apollo";
import { RouteComponentProps } from "react-router";
import { toast } from "react-toastify";

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
  uploading: boolean;
  file?: Blob;
}

class UpdateProfileMutation extends Mutation<updateProfile, updateProfileVariables> {}
class UserProfileQuery extends Query<myProfile> {}

class EditAccountContainer extends React.Component<IProps, IState> {
  public state = {
    email: "",
    firstName: "",
    lastName: "",
    profilePhoto: "",
    uploading: false
  };

  public render() {
    const { email, firstName, lastName, profilePhoto, uploading } = this.state;
    return (
      <UserProfileQuery
        query={USER_PROFILE}
        fetchPolicy="cache-and-network"
        onCompleted={this.updateField}
      >
        {() => (
          <UpdateProfileMutation
            mutation={UPDATE_PROFILE}
            variables={{
              email,
              firstName,
              lastName,
              profilePhoto
            }}
            refetchQueries={[{ query: USER_PROFILE }]}
            onCompleted={data => {
              const { UpdateMyProfile } = data;
              if (UpdateMyProfile.ok) {
                toast.success("Profile Updated!");
              } else if (UpdateMyProfile.error) {
                toast.error(UpdateMyProfile.error);
              }
            }}
          >
            {(updateProfileFn, { loading }) => (
              <EditAccountPresenter
                uploading={uploading}
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

      const request = await axios.post(
        `https://api.cloudinary.com/v1_1/dbfkfuxui/image/upload`,
        formData
      );
      console.log(request);
    }

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
