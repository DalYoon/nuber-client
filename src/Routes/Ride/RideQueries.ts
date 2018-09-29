import { gql } from "apollo-boost";

export const GET_RIDE = gql`
  query getRide($rideId: Int!) {
    GetRide(rideId: $rideId) {
      ok
      error
      ride {
        id
        status
        pickUpAddress
        dropOffAddress
        price
        distance
        duration
        passenger {
          id
          fullName
          profilePhoto
        }
        driver {
          id
          fullName
          profilePhoto
        }
        chatId
      }
    }
  }
`;

export const RIDE_SUBSCRIPTION = gql`
  subscription rideUpdates {
    RideStatusSubscription {
      id
      status
      pickUpAddress
      dropOffAddress
      price
      distance
      duration
      passenger {
        id
        fullName
        profilePhoto
      }
      driver {
        id
        fullName
        profilePhoto
      }
      chatId
    }
  }
`;

export const UPDATE_RIDE_STATUS = gql`
  mutation updateRide($rideId: Int!, $status: StatusOptions!) {
    UpdateRideStatus(rideId: $rideId, status: $status) {
      ok
      error
      rideId
    }
  }
`;
