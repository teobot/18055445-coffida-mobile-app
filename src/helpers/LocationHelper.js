import * as Location from "expo-location";
import { getDistance } from "geolib";

export default class LocationHelper {
  static getLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return null;
    }
    let location = await Location.getCurrentPositionAsync({});
    return location;
  };

  static getDistanceToCoords = async ({ lat, long }) => {
    const userLocation = await this.getLocation();
    if (userLocation !== null) {
      const distance = await getDistance(
        { latitude: lat, longitude: long },
        {
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
        }
      );
      return distance;
    } else {
      return null;
    }
  };
}
