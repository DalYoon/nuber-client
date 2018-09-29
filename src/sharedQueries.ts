import { gql } from "apollo-boost";

export const USER_PROFILE = gql`
  query myProfile {
    GetMyProfile {
      ok
      error
      user {
        id
        email
        fullName
        firstName
        lastName
        profilePhoto
        phoneNumber
        profilePhoto
        isDriving
      }
    }
  }
`;

export const GET_PLACES = gql`
  query getPlaces {
    GetMyPlaces {
      ok
      error
      places {
        id
        name
        address
        isFav
      }
    }
  }
`;
