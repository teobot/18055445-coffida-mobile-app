import { createContext, useState, useEffect } from "react";
import LocationHelper from "../helpers/LocationHelper";

export const LocationContext = createContext();

export default () => {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    updateUserLocation();
  }, []);

  const updateUserLocation = async () => {
    try {
      const locationResponse = await LocationHelper.getLocation();
      setUserLocation(locationResponse);
    } catch (error) {}
  };

  return [{ userLocation }];
};
