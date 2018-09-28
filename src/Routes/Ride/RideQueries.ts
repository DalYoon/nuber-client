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
          fullName
          profilePhoto
        }
        driver {
          fullName
          profilePhoto
        }
        chatId
      }
    }
  }
`;
