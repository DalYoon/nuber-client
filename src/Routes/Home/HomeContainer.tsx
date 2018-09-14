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
  public userMarker: google.maps.Marker;

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
    console.log(this.state.lat, this.state.lng);
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
    const userMarkerOptions: google.maps.MarkerOptions = {
      icon: {
        path: maps.SymbolPath.CIRCLE,
        scale: 7
      },
      position: {
        lat,
        lng
      }
    };
    this.userMarker = new maps.Marker(userMarkerOptions);
    this.userMarker.setMap(this.map);

    const watchOptions: PositionOptions = {
      enableHighAccuracy: true
    };

    navigator.geolocation.watchPosition(
      this.handleGeoWatchSuccess,
      this.handleGeoWatchError,
      watchOptions
    );
  };

  // ------------------------------------------------------------

  public handleGeoWatchSuccess: PositionCallback = (position: Position) => {
    const {
      coords: { latitude: lat, longitude: lng }
    } = position;

    this.userMarker.setPosition({ lat, lng });
    this.map.panTo({ lat, lng });
  };

  // ------------------------------------------------------------

  public handleGeoWatchError: PositionErrorCallback = () => {
    return console.log("No location");
  };
}

export default HomeContainer;
