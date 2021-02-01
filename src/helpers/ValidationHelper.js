import Filter from "bad-words";

export default class ValidationHelper {
  static ValidateCreateAccountForm = (array) => {
    // console.log("Validating given javascript object!");
    const filter = new Filter();
    return filter.isProfane(JSON.stringify(array));
  };
}
