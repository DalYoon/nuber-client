import { SubscribeToMoreOptions } from "apollo-boost";
import React from "react";
import { Mutation, Query } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import {
  getRide,
  getRideVariables,
  myProfile,
  updateRide,
  updateRideVariables
} from "../../types/api";

import { USER_PROFILE } from "../../sharedQueries";
import { GET_RIDE, RIDE_SUBSCRIPTION, UPDATE_RIDE_STATUS } from "./RideQueries";

import RidePresenter from "./RidePresenter";

interface IProps extends RouteComponentProps<any> {}

class RideQuery extends Query<getRide, getRideVariables> {}
class ProfileQuery extends Query<myProfile> {}
class RideUpdateMutation extends Mutation<updateRide, updateRideVariables> {}

class RideContainer extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);

    if (!props.match.params.rideId) {
      props.history.push("/");
    }
  }

  public render() {
    const {
      match: {
        params: { rideId }
      }
    } = this.props;
    return (
      <ProfileQuery query={USER_PROFILE}>
        {({ data: userData }) => (
          <RideQuery query={GET_RIDE} variables={{ rideId }}>
            {({ data: rideData, loading, subscribeToMore }) => {
              const subscribeOptions: SubscribeToMoreOptions = {
                document: RIDE_SUBSCRIPTION,
                updateQuery: this.handleSubscriptionUpdate
              };
              subscribeToMore(subscribeOptions);
              return (
                <RideUpdateMutation
                  mutation={UPDATE_RIDE_STATUS}
                  refetchQueries={[{ query: GET_RIDE, variables: { rideId } }]}
                >
                  {updateRideFn => (
                    <RidePresenter
                      rideData={rideData}
                      userData={userData}
                      loading={loading}
                      updateRideFn={updateRideFn}
                      goToChat={this.goToChat}
                    />
                  )}
                </RideUpdateMutation>
              );
            }}
          </RideQuery>
        )}
      </ProfileQuery>
    );
  }

  public handleSubscriptionUpdate = (prev, { subscriptionData }) => {
    if (!subscriptionData.data) {
      return prev;
    }

    const {
      data: {
        RideStatusSubscription: { status }
      }
    } = subscriptionData;

    if (status === "FINISHED") {
      window.location.href = "/";
    }
  };

  public goToChat = ({ chatId }) => {
    const {
      history,
      match: { url }
    } = this.props;

    history.push({
      pathname: `/chat/${chatId}`,
      state: {
        rideUrl: url
      }
    });
  };
}

export default RideContainer;
