import React from "react";
import { Mutation, Query } from "react-apollo";

import { USER_PROFILE } from "../../sharedQueries";
import { LOG_USER_OUT } from "../../sharedQueries.local";
import { myProfile } from "../../types/api";

import SettingsPresenter from "./SettingsPresenter";

class MiniProfileQuery extends Query<myProfile> {}

class SettingContainer extends React.Component {
  public render() {
    return (
      <Mutation mutation={LOG_USER_OUT}>
        {logUserOutFn => (
          <MiniProfileQuery query={USER_PROFILE}>
            {({ data, loading: userDataLoading }) => (
              <SettingsPresenter
                logUserOutFn={logUserOutFn}
                userData={data}
                userDataLoading={userDataLoading}
              />
            )}
          </MiniProfileQuery>
        )}
      </Mutation>
    );
  }
}

export default SettingContainer;
