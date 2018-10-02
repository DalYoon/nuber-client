import { gql } from "apollo-boost";

export const GET_RIDE_HISTORY = gql`
  query getRideHistory {
    GetRideHistory {
      ok
      error
      ridesAsPassenger {
        id
        status
        pickUpAddress
        dropOffAddress
        price
        distance
        passenger {
          fullName
        }
        driver {
          fullName
        }
        updatedAt
      }
      ridesAsDriver {
        id
        status
        pickUpAddress
        dropOffAddress
        price
        distance
        passenger {
          fullName
        }
        driver {
          fullName
        }
        updatedAt
      }
    }
  }
`;
