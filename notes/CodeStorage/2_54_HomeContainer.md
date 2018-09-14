```typescript
import React from "react";
import { Query } from "react-apollo";
import ReactDOM from "react-dom";
import { RouteComponentProps } from "react-router";

import { USER_PROFILE } from "../../sharedQueries";
import { myProfile } from "../../types/api";

import HomePresenter from "./HomePresenter";

interface IState {
  isMenuOpen: boolean;
  lat: number;
  lng: number;
}

interface IProps extends RouteComponentProps<any> {
  google: any;
}

class ProfileQuery extends Query<myProfile> {}

class HomeContainer extends React.Component<IProps, IState> {
  public mapRef: any;
  public map: google.maps.Map;

  constructor(props) {
    super(props);

    this.mapRef = React.createRef();

    this.state = {
      isMenuOpen: false,
      lat: 0,
      lng: 0
    };
  }

  public componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.handleGeoSuccess, this.handleGeoError);
  }

  public render() {
    const { isMenuOpen } = this.state;
    return (
      <ProfileQuery query={USER_PROFILE}>
        {({ loading }) => (
          <HomePresenter
            loading={loading}
            isMenuOpen={isMenuOpen}
            toggleMenu={this.toggleMenu}
            mapRef={this.mapRef}
          />
        )}
      </ProfileQuery>
    );
  }

  // ------------------------------------------------------------

  public toggleMenu = () => {
    const { isMenuOpen } = this.state;
    this.setState({
      isMenuOpen: !isMenuOpen
    });
  };

  // ------------------------------------------------------------

  public handleGeoSuccess: PositionCallback = (position: Position) => {
    const {
      coords: { latitude, longitude }
    } = position;
    this.setState({
      lat: latitude,
      lng: longitude
    });
    this.loadMap(latitude, longitude);
  };

  // ------------------------------------------------------------

  public handleGeoError: PositionErrorCallback = () => {
    return console.log("No location");
  };

  // ------------------------------------------------------------

  public loadMap = (lat, lng) => {
    const { google } = this.props;
    const maps = google.maps;
    const mapNode = ReactDOM.findDOMNode(this.mapRef.current);
    const mapConfig: google.maps.MapOptions = {
      center: {
        lat,
        lng
      },
      disableDefaultUI: true,
      minZoom: 8,
      zoom: 15
    };
    this.map = new maps.Map(mapNode, mapConfig);
  };

  // ------------------------------------------------------------
}

export default HomeContainer;
```
