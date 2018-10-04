import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { ApolloLink, concat, Operation, split } from "apollo-link";
import { onError } from "apollo-link-error";
import { HttpLink } from "apollo-link-http";
import { withClientState } from "apollo-link-state";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { toast } from "react-toastify";

const isDev = process.env.NODE_ENV === "development";

const getToken = () => {
  const token = localStorage.getItem("jwt");

  if (token) {
    return token;
  } else {
    return "";
  }
};

const cache = new InMemoryCache();

const authMiddleware = new ApolloLink((operation: Operation, forward: any) => {
  operation.setContext({
    headers: {
      "X-JWT": getToken()
    }
  });
  return forward(operation);
});

const httpLink = new HttpLink({
  uri: isDev ? "http://localhost:4000/graphql" : "https://duberserver.now.sh/graphql"
});

const wsLink = new WebSocketLink({
  options: {
    connectionParams: {
      "X-JWT": getToken()
    },
    reconnect: true
  },
  uri: isDev ? "ws://localhost:4000/subscription" : "ws://duberserver.now.sh/subscription"
});

const combinedLinks = split(
  ({ query }) => {
    const { kind, operation }: any = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink
);

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message }) => {
      toast.error(`Unexpected error: ${message}`);
    });
  }
  if (networkError) {
    toast.error(`Network error: ${networkError}`);
  }
});

const localStateLink = withClientState({
  cache,
  // define default state -----------------------------------------------
  defaults: {
    auth: {
      __typename: "Auth",
      isLoggedIn: Boolean(localStorage.getItem("jwt"))
    }
  },
  // --------------------------------------------------------------------
  // define local resolvers ---------------------------------------------
  resolvers: {
    Mutation: {
      // Login Mutation -------------------------------------------------
      logUserIn: (_, { token }, { cache: appCache }) => {
        localStorage.setItem("jwt", token);
        appCache.writeData({
          data: {
            auth: {
              __typename: "Auth",
              isLoggedIn: true
            }
          }
        });
        return null;
      },
      // -----------------------------------------------------------------
      // Logout Mutation -------------------------------------------------
      logUserOut: (_, __, { cache: appCache }) => {
        localStorage.removeItem("jwt");
        appCache.writeData({
          data: {
            auth: {
              __typename: "Auth",
              isLoggedIn: false
            }
          }
        });
        return null;
      }
      // -----------------------------------------------------------------
    }
  }
});

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([errorLink, localStateLink, concat(authMiddleware, combinedLinks)])
});

export default client;

// apollo-boost version code

// import { ApolloClient } from 'apollo-boost';

// const client = new ApolloClient({
//   clientState: {
//     defaults: {
//       auth: {
//         __typename: "Auth",
//         isLoggedIn: Boolean(localStorage.getItem("jwt"))
//       }
//     },
//     resolvers: {
//       Mutation: {
//         // log in resolver
//         logUserIn: (_, { token }, { cache }) => {
//           localStorage.setItem("jwt", token);
//           cache.writeData({
//             data: {
//               auth: {
//                 __typename: "Auth",
//                 isLoggedIn: true
//               }
//             }
//           });
//           return null;
//         },

//         // log out resolver
//         logUserOut: (_, __, { cache }) => {
//           localStorage.removeItem("jwt");
//           cache.writeData({
//             data: {
//               auth: {
//                 __typename: "Auth",
//                 isLoggedIn: false
//               }
//             }
//           });
//           return null;
//         }
//       }
//     }
//   },

//   // catch request and put jwt header in it
//   request: async (operation: Operation) => {
//     operation.setContext({
//       headers: {
//         "X-JWT": localStorage.getItem("jwt") || ""
//       }
//     });
//   },

//   // backend api for graphql
//   uri: `http://localhost:4000/graphql`
// });

// export default client;
