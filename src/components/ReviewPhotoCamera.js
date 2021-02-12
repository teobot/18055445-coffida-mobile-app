import React, { useState, useEffect, createRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { Camera } from "expo-camera";
import coffida from "../api/coffida";

export default function ReviewPhotoCamera({
  location_id,
  review_id,
  ImageQuality,
  CameraStartingDirection,
  setPhotoLocation,
  OnImageSuccess,
  OnImageFailed,
  AccessDeniedMessage,
  WhilePermissionsNull,
  AspectRatio,
}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraStartingDirection);
  const CameraRef = createRef();

  const takePicture = async () => {
    if (CameraRef) {
      const options = { quality: ImageQuality, base64: true };
      const data = await CameraRef.current.takePictureAsync(options);
      onPictureSaved(data);
    }
  };

  const onPictureSaved = async (photo) => {
    const format = photo.uri.split(".")[photo.uri.split(".").length - 1];
    await fetch(
      `${coffida.defaults.baseURL}/location/${location_id}/review/${review_id}/photo`,
      {
        method: "POST",
        headers: {
          "Content-Type": `image/${
            format === "jpg" || format === "jpeg" ? "jpeg" : "png"
          }`,
          ...coffida.defaults.headers.common,
        },
        body: photo,
      }
    )
      .then((response) => {
        switch (response.status) {
          case 200:
            return;
          case 500:
            throw new Error("Server error");
        }
      })
      .then(() => {
        OnImageSuccess({ status: "OK" });
      })
      .catch((err) => {
        OnImageFailed({ status: "BAD_REQUEST", error: err });
      });

    setPhotoLocation(photo.uri);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    // : permissions are null user, has not agreed yet
    return WhilePermissionsNull;
  }
  if (hasPermission === false) {
    // : user denied camera access
    return <Text>{AccessDeniedMessage}</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera
        ratio={AspectRatio}
        style={{ flex: 1 }}
        type={type}
        ref={CameraRef}
      />
      <View
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }}
        >
          <Icon reverse name="sync-outline" type="ionicon" color="#517fa4" />
        </TouchableOpacity>

        <TouchableOpacity onPress={takePicture}>
          <Icon reverse name="camera-outline" type="ionicon" color="#517fa4" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
});
