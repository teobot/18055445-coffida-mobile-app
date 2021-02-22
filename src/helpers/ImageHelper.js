import coffida from "../api/coffida";

export default class ImageHelper {
  static onPictureSaved = async (photo, location_id, review_id) => {
    // This function handles the sending of the image to the api

    // Gather the format by talking the last image format from the end of the image uri
    const format = photo.uri.split(".")[photo.uri.split(".").length - 1];
    
    let responseReturn = null;
    
    // Here I use a fetch request instead of the coffida api axios library, 
    // This is because when using the POST request axios applies a form encoding header to the request,
    // when POSTING a image it needs a different type of request encoding,
    // so instead of removing and editing these headers I use the built in FETCH library,
    // I also use the coffida api default parameters like the url and token headers
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
