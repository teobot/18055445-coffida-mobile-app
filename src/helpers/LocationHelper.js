import * as Location from "expo-location";

export default class LocationHelper {
  static getLocation = async () => {
    // This functions handles gathering the users location

    // Request location permissions
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      return null;
    }
    // If the permissions are alright then gather the location data and return it
    let location = await Location.getCurrentPositionAsync();
    return location;
  };
}
