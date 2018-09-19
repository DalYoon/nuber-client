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
