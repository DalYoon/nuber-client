import React from "react";
import { Mutation, Query } from "react-apollo";
import { toast } from "react-toastify";

import { USER_PROFILE } from "../../sharedQueries";
import { myProfile, toggleDriving } from "../../types/api";
import { TOGGLE_DRIVING } from "./MunuQueries";

import MenuPresenter from "./MenuPresenter";

class ProfileQuery extends Query<myProfile> {}
class ToggleDrivingMutation extends Mutation<toggleDriving> {}

class MenuContainer extends React.Component {
  public render() {
    return (
      <ToggleDrivingMutation
        mutation={TOGGLE_DRIVING}
        // refetchQueries={[{ query: USER_PROFILE }]}
        update={(cache, { data }) => {
          if (data) {
            const { ToggleDrivingMode } = data;

            if (!ToggleDrivingMode.ok) {
              toast.error(ToggleDrivingMode.error);
              return;
            }

            const query: myProfile | null = cache.readQuery({
              query: USER_PROFILE
            });

            if (query) {
              const {
                GetMyProfile: { user }
              } = query;

              if (user) {
                user.isDriving = !user.isDriving;
              }
            }

            cache.writeQuery({ query: USER_PROFILE, data: query });
          }
        }}
      >
        {toggleDrivingFn => (
          <ProfileQuery query={USER_PROFILE}>
            {({ data, loading }) => (
              <MenuPresenter data={data} loading={loading} toggleDrivingFn={toggleDrivingFn} />
            )}
          </ProfileQuery>
        )}
      </ToggleDrivingMutation>
    );
  }
}

export default MenuContainer;
