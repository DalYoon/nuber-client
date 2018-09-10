import React from "react";
import { Mutation } from "react-apollo";
import { RouteComponentProps } from "react-router";

import { GET_PLACES } from "../../sharedQueries";
import { addPlace, addPlaceVariables } from "../../types/api";
import { ADD_PLACE } from "./AddPlaceQueries";

import { toast } from "react-toastify";
import AddPlacePresenter from "./AddPlacePresenter";

interface IProps extends RouteComponentProps<any> {}

interface IState {
  address: string;
  name: string;
  lat: number;
  lng: number;
}

class AddPlaceMutation extends Mutation<addPlace, addPlaceVariables> {}

class AddPlaceContainer extends React.Component<IProps, IState> {
  public state = {
    address: "",
    lat: 1.34,
    lng: 1.34,
    name: ""
  };

  public render() {
    const { address, name, lat, lng } = this.state;
    const { history } = this.props;
    return (
      <AddPlaceMutation
        mutation={ADD_PLACE}
        variables={{
          address,
          isFav: false,
          lat,
          lng,
          name
        }}
        refetchQueries={[{ query: GET_PLACES }]}
        onCompleted={data => {
          const { AddPlace } = data;
          if (AddPlace.ok) {
            toast.success("Place Added!");
            setTimeout(() => history.push("/places"), 1500);
          } else {
            toast.error(AddPlace.error);
          }
        }}
      >
        {addPlaceFn => (
          <AddPlacePresenter
            address={address}
            name={name}
            onChange={this.onInputChange}
            loading={false}
            onSubmitFn={addPlaceFn}
          />
        )}
      </AddPlaceMutation>
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
