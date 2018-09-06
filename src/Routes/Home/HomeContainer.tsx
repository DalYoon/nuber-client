import React from "react";
import { Query } from "react-apollo";
import { RouteComponentProps } from "react-router";

import { USER_PROFILE } from "../../sharedQueries";
import { myProfile } from "../../types/api";

import HomePresenter from "./HomePresenter";

interface IState {
  isMenuOpen: boolean;
}

interface IProps extends RouteComponentProps<any> {}

class ProfileQuery extends Query<myProfile> {}

class HomeContainer extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      isMenuOpen: false
    };
  }

  public render() {
    const { isMenuOpen } = this.state;
    return (
      <ProfileQuery query={USER_PROFILE}>
        {({ loading }) => (
          <HomePresenter loading={loading} isMenuOpen={isMenuOpen} toggleMenu={this.toggleMenu} />
        )}
      </ProfileQuery>
    );
  }

  public toggleMenu = () => {
    const { isMenuOpen } = this.state;
    this.setState({
      isMenuOpen: !isMenuOpen
    });
  };
}

export default HomeContainer;
