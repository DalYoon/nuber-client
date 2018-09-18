import { gql } from "apollo-boost";

export const REPORT_LOCATION = gql`
  mutation reportMovement($lastLat: Float!, $lastLng: Float!) {
    ReportMovement(lastLat: $lastLat, lastLng: $lastLng) {
      ok
      error
    }
  }
`;
