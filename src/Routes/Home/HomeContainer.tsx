import React from "react";
import { RouteComponentProps } from "react-router";

import HomePresenter from "./HomePresenter";

interface IState {
  isMenuOpen: boolean;
}

interface IProps extends RouteComponentProps<any> {}

class HomeContainer extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      isMenuOpen: false
    };
  }

  public render() {
    const { isMenuOpen } = this.state;
    return <HomePresenter isMenuOpen={isMenuOpen} toggleMenu={this.toggleMenu} />;
  }

  public toggleMenu = () => {
    const { isMenuOpen } = this.state;
    this.setState({
      isMenuOpen: !isMenuOpen
    });
  };
}

export default HomeContainer;
