import { gql } from "apollo-boost";

export const USER_PROFILE = gql`
  query myProfile {
    GetMyProfile {
      ok
      error
      user {
        email
        fullName
        phoneNumber
        profilePhoto
      }
    }
  }
`;
