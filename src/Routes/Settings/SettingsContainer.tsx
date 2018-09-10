import React from "react";
import { Mutation, Query } from "react-apollo";

import { GET_PLACES, USER_PROFILE } from "../../sharedQueries";
import { LOG_USER_OUT } from "../../sharedQueries.local";
import { getPlaces, myProfile } from "../../types/api";

import SettingsPresenter from "./SettingsPresenter";

class MiniProfileQuery extends Query<myProfile> {}
class PlacesQuery extends Query<getPlaces> {}

class SettingContainer extends React.Component {
  public render() {
    return (
      <Mutation mutation={LOG_USER_OUT}>
        {logUserOutFn => (
          <MiniProfileQuery query={USER_PROFILE}>
            {({ data: userData, loading: userDataLoading }) => (
              <PlacesQuery query={GET_PLACES}>
                {({ data: placesData, loading: placesLoading }) => (
                  <SettingsPresenter
                    logUserOutFn={logUserOutFn}
                    userData={userData}
                    userDataLoading={userDataLoading}
                    placesData={placesData}
                    placesLoading={placesLoading}
                  />
                )}
              </PlacesQuery>
            )}
          </MiniProfileQuery>
        )}
      </Mutation>
    );
  }
}

export default SettingContainer;
