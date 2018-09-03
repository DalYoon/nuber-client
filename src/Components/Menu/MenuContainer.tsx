import React from "react";

import MenuPresenter from "./MenuPresenter";

class MenuContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  public render() {
    return <MenuPresenter />;
  }
}

export default MenuContainer;
