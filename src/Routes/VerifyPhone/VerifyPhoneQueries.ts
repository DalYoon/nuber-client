import { gql } from "apollo-boost";

export const VERIFY_PHONE = gql`
  mutation verifyPhone($key: String!, $phoneNumber: String!) {
    CompletePhoneVerification(phoneNumber: $phoneNumber, key: $key) {
      ok
      error
      token
    }
  }
`;

export const SKIP_VERIFICATION = gql`
  mutation skipVerification($phoneNumber: String!) {
    SkipPhoneVerification(phoneNumber: $phoneNumber) {
      ok
      error
    }
  }
`;
