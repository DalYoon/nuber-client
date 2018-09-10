import { GoogleApiWrapper } from "google-maps-react";
import FindAddressContainer from "./FindAddressContainer";

export default GoogleApiWrapper({ apiKey: "AIzaSyAP2BeHMw1XYXL63EtX2jkAiAwrsV1hGsw" })(
  FindAddressContainer
);
