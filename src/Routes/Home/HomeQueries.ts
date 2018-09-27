import { gql } from "apollo-boost";

export const REPORT_LOCATION = gql`
  mutation reportMovement($lastLat: Float!, $lastLng: Float!) {
    ReportMovement(lastLat: $lastLat, lastLng: $lastLng) {
      ok
      error
    }
  }
`;

export const GET_NEARBY_DRIVERS = gql`
  query getDrivers {
    GetNearbyDrivers {
      ok
      drivers {
        id
        lastLat
        lastLng
      }
    }
  }
`;

export const REQUEST_RIDE = gql`
  mutation requestRide(
    $pickUpAddress: String!
    $pickUpLat: Float!
    $pickUpLng: Float!
    $dropOffAddress: String!
    $dropOffLat: Float!
    $dropOffLng: Float!
    $price: Float!
    $distance: String!
    $duration: String!
  ) {
    RequestRide(
      pickUpAddress: $pickUpAddress
      pickUpLat: $pickUpLat
      pickUpLng: $pickUpLng
      dropOffAddress: $dropOffAddress
      dropOffLat: $dropOffLat
      dropOffLng: $dropOffLng
      price: $price
      distance: $distance
      duration: $duration
    ) {
      ok
      error
      ride {
        id
      }
    }
  }
`;

export const GET_NEARBY_RIDE = gql`
  query getRides {
    GetNearbyRide {
      ok
      error
      ride {
        id
        pickUpAddress
        dropOffAddress
        price
        distance
        passenger {
          fullName
          profilePhoto
        }
      }
    }
  }
`;
