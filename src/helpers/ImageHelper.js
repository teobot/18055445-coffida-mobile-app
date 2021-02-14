import coffida from "../api/coffida";

export default class ImageHelper {
  static onPictureSaved = async (photo, location_id, review_id) => {
    const format = photo.uri.split(".")[photo.uri.split(".").length - 1];
    let responseReturn = null;
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
        responseReturn = { status: "OK" };
      })
      .catch((err) => {
        responseReturn = { status: "BAD_REQUEST", error: err };
      });

    return responseReturn;
  };
}
