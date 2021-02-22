import { createContext, useState, useEffect } from "react";
import LocationHelper from "../helpers/LocationHelper";

export const LocationContext = createContext();

export default () => {
  // This handles the global user of the user location information

  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // On load gather the user location
    updateUserLocation();
  }, []);

  const updateUserLocation = async () => {
    // Update the user location
    try {
      const locationResponse = await LocationHelper.getLocation();
      setUserLocation(locationResponse);
    } catch (error) {}
  };

  return [{ userLocation }];
};
