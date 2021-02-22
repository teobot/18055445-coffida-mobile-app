import React, { createContext, createRef } from "react";

// Toast import
import Toast from "react-native-toast-message";

// Following is contextImport
// const { showToast, show404Toast, show500Toast, show200Toast, showBadInputToast, showGoodInputToast } = useContext(ToastContext);

export const ToastContext = createContext();

export default () => {

  // Create the reference for the toast
  const ToastRef = createRef();

  const showToast = (Toast) => {
    // This handles showing a toast object
    ToastRef.current.show(Toast);
  };

  const show404Toast = () => {
    // This shows a 404 error toast
    ToastRef.current.show({
      type: "error",
      position: "top",
      text1: "Bad Request",
      text2: "Please try again later",
      visibilityTime: 4000,
      autoHide: true,
    });
  };

  const show500Toast = () => {
    // This shows a 500 error toast
    ToastRef.current.show({
      type: "error",
      position: "top",
      text1: "Server Error",
      text2: "Please try again later",
      visibilityTime: 4000,
      autoHide: true,
    });
  };

  const show200Toast = (message) => {
    // This shows a success message with custom text2
    ToastRef.current.show({
      type: "success",
      position: "top",
      text1: "Success",
      text2: message,
      visibilityTime: 2000,
      autoHide: true,
    });
  };

  const showBadInputToast = ({ topMessage, bottomMessage }) => {
    // This shows a bad input toast with custom texts
    ToastRef.current.show({
      type: "error",
      position: "top",
      text1: topMessage,
      text2: bottomMessage,
      visibilityTime: 4000,
      autoHide: true,
    });
  };

  const showGoodInputToast = ({ topMessage, bottomMessage }) => {
    // This shows a good input toast with custom texts
    ToastRef.current.show({
      type: "success",
      position: "top",
      text1: topMessage,
      text2: bottomMessage,
      visibilityTime: 4000,
      autoHide: true,
    });
  };

  const ToastElement = <Toast ref={ToastRef} />;

  return [
    ToastElement,
    {
      showToast,
      show404Toast,
      show500Toast,
      show200Toast,
      showBadInputToast,
      showGoodInputToast,
    },
  ];
};
