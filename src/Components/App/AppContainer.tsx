import React from "react";
import { graphql } from "react-apollo";

import theme from "../../theme";
import { ThemeProvider } from "../../typed-components";
import AppPresenter from "./AppPresenter";
import { IS_LOGGED_IN } from "./AppQueries";

const AppContainer = ({ data }) => {
  const { isLoggedIn } = data.auth;
  return (
    <ThemeProvider theme={theme}>
      <AppPresenter isLoggedIn={isLoggedIn} />
    </ThemeProvider>
  );
};

export default graphql(IS_LOGGED_IN)(AppContainer);
