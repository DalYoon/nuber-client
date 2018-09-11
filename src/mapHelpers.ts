import axios from "axios";
import { MAPS_KEY } from "./keys";

export const geoCode = () => null;

export const reverseGeoCode = async (lat: number, lng: number) => {
  const URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&location_type=ROOFTOP&result_type=street_address&key=${MAPS_KEY}`;
  const { status, data } = await axios(URL);
  console.log("status: ", status);
  console.log("data: ", data);
};
