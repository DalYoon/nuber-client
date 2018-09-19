import React from "react";
import { graphql, MutationFn, Query } from "react-apollo";
import ReactDOM from "react-dom";
import { RouteComponentProps } from "react-router";
import { toast } from "react-toastify";
import { geoCode } from "../../mapHelpers";

import { USER_PROFILE } from "../../sharedQueries";
import { getDrivers, myProfile, reportMovement, reportMovementVariables } from "../../types/api";

import HomePresenter from "./HomePresenter";
import { GET_NEARBY_DRIVERS, REPORT_LOCATION } from "./HomeQueries";

interface IState {
  isMenuOpen: boolean;
  lat: number;
  lng: number;
  toAddress: string;
  toLat: number;
  toLng: number;
  duration?: string;
  distance: string;
  price?: number;
}

interface IProps extends RouteComponentProps<any> {
  google: any;
  reportLocation: MutationFn;
}

class ProfileQuery extends Query<myProfile> {}
class NearbyQueries extends Query<getDrivers> {}

class HomeContainer extends React.Component<IProps, IState> {
  public mapRef: any;
  public map: google.maps.Map;
  public userMarker: google.maps.Marker;
  public toMarker: google.maps.Marker;
  public directions: google.maps.DirectionsRenderer;
  public drivers: google.maps.Marker[];

  constructor(props) {
    super(props);

    this.mapRef = React.createRef();

    this.drivers = [];

    this.state = {
      distance: "",
      isMenuOpen: false,
      lat: 0,
      lng: 0,
      toAddress: "",
      toLat: 0,
      toLng: 0
    };
  }

  public componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.handleGeoSuccess, this.handleGeoError);
  }

  public render() {
    const { isMenuOpen, toAddress, price } = this.state;
    return (
      <ProfileQuery query={USER_PROFILE}>
        {({ data, loading }) => {
          return (
            <NearbyQueries
              query={GET_NEARBY_DRIVERS}
              onCompleted={this.handleNearbyDrivers}
              pollInterval={1000}
              skip={
                (data &&
                  data.GetMyProfile &&
                  data.GetMyProfile.user &&
                  data.GetMyProfile.user.isDriving) ||
                false
              }
            >
              {() => (
                <HomePresenter
                  loading={loading}
                  isMenuOpen={isMenuOpen}
                  toggleMenu={this.toggleMenu}
                  mapRef={this.mapRef}
                  toAddress={toAddress}
                  onInputChange={this.onInputChange}
                  onAddressSubmit={this.onAddressSubmit}
                  price={price}
                  data={data}
                />
              )}
            </NearbyQueries>
          );
        }}
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

    if (!mapNode) {
      this.loadMap(lat, lng);
      return;
    }

    const mapConfig: google.maps.MapOptions = {
      center: {
        lat,
        lng
      },
      disableDefaultUI: true,
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
    const { reportLocation } = this.props;
    const {
      coords: { latitude: lat, longitude: lng }
    } = position;

    this.userMarker.setPosition({ lat, lng });
    this.map.panTo({ lat, lng });

    reportLocation({
      variables: {
        lastLat: lat,
        lastLng: lng
      }
    });
  };

  // ------------------------------------------------------------

  public handleGeoWatchError: PositionErrorCallback = () => {
    return console.log("No location");
  };

  // ------------------------------------------------------------

  public onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value }
    } = event;

    this.setState({
      [name]: value
    } as any);
  };

  // ------------------------------------------------------------

  public onAddressSubmit = async () => {
    const { toAddress } = this.state;
    const { google } = this.props;
    const maps = google.maps;
    const result = await geoCode(toAddress);
    if (result !== false) {
      const { lat, lng, formatted_address: formattedAddress } = result;

      if (this.toMarker) {
        this.toMarker.setMap(null);
      }

      const toMarkerOptions: google.maps.MarkerOptions = {
        position: {
          lat,
          lng
        }
      };

      this.toMarker = new maps.Marker(toMarkerOptions);
      this.toMarker.setMap(this.map);

      const bounds = new maps.LatLngBounds();
      bounds.extend({ lat, lng });
      bounds.extend({ lat: this.state.lat, lng: this.state.lng });
      this.map.fitBounds(bounds);

      this.setState(
        {
          toAddress: formattedAddress,
          toLat: lat,
          toLng: lng
        },
        this.createPath
      );
    }
  };

  // ------------------------------------------------------------

  public createPath = () => {
    const { lat, lng, toLat, toLng } = this.state;

    if (this.directions) {
      this.directions.setMap(null);
    }

    const renderOptions: google.maps.DirectionsRendererOptions = {
      polylineOptions: {
        strokeColor: "#000"
      },
      suppressMarkers: true
    };

    this.directions = new google.maps.DirectionsRenderer(renderOptions);
    const directionService: google.maps.DirectionsService = new google.maps.DirectionsService();
    const to = new google.maps.LatLng(toLat, toLng);
    const from = new google.maps.LatLng(lat, lng);
    const directionsOptions: google.maps.DirectionsRequest = {
      destination: to,
      origin: from,
      travelMode: google.maps.TravelMode.DRIVING
    };

    directionService.route(directionsOptions, this.handleRouteRequest);
  };

  // ------------------------------------------------------------

  public handleRouteRequest = (result, status) => {
    if (status === google.maps.DirectionsStatus.OK) {
      const { routes } = result;
      const {
        distance: { text: distance },
        duration: { text: duration }
      } = routes[0].legs[0];

      this.directions.setDirections(result);
      this.directions.setMap(this.map);

      this.setState(
        {
          distance,
          duration
        },
        this.setPrice
      );
    } else {
      toast.error("There is no route to get the place, you have to swim");
    }
  };

  // ------------------------------------------------------------

  public setPrice = () => {
    const { distance } = this.state;

    this.setState({
      price: parseFloat(distance.replace(".", ",")) * 3
    });
  };

  // ------------------------------------------------------------

  public handleNearbyDrivers = (data: {} | getDrivers) => {
    if ("GetNearbyDrivers" in data) {
      const {
        GetNearbyDrivers: { ok, drivers }
      } = data;

      if (ok && drivers) {
        for (const driver of drivers) {
          console.log(driver);

          if (driver && driver.lastLat && driver.lastLng) {
            const markerOptions: google.maps.MarkerOptions = {
              icon: {
                path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                scale: 5
              },
              position: {
                lat: driver.lastLat,
                lng: driver.lastLng
              }
            };

            const newMarker: google.maps.Marker = new google.maps.Marker(markerOptions);
            newMarker.set("ID", driver.id);
            newMarker.setMap(this.map);
          }
        }
      }
    }
  };
}

export default graphql<any, reportMovement, reportMovementVariables>(REPORT_LOCATION, {
  name: "reportLocation"
})(HomeContainer);
