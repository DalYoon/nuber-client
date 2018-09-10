import React from "react";
import { RouteComponentProps } from "react-router";
import AddPlacePresenter from "./AddPlacePresenter";

interface IProps extends RouteComponentProps<any> {}

interface IState {
  address: string;
  name: string;
}

class AddPlaceContainer extends React.Component<IProps, IState> {
  public state = {
    address: "",
    name: ""
  };

  public render() {
    const { address, name } = this.state;
    return (
      <AddPlacePresenter
        address={address}
        name={name}
        onChange={this.onInputChange}
        loading={false}
      />
    );
  }

  public onInputChange = event => {
    const {
      target: { name, value }
    } = event;

    this.setState({
      [name]: value
    } as any);
  };
}

export default AddPlaceContainer;
