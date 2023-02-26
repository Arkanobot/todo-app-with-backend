import { toast } from "react-toastify";

// default toast  with message - takes input message
export function toastify(message) {
  toast(`${message}`, {
    position: "bottom-left",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
}

//success toast with message takes input message and location of toast on screen
export function successToast(message, loc = "top-center") {
  toast.success(`${message}!`, {
    position: loc,
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
}
//error toast with message takes input message and location of toast on screen
export function errorToast(message, loc = "top-center") {
  toast.error(`${message}!`, {
    position: loc,
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
}
