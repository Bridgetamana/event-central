import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const defaultConfig = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const showToast = {
  success: (message, config = {}) => {
    toast.success(message, { ...defaultConfig, ...config });
  },
  error: (message, config = {}) => {
    toast.error(message, { ...defaultConfig, ...config });
  },
  info: (message, config = {}) => {
    toast.info(message, { ...defaultConfig, ...config });
  },
  warning: (message, config = {}) => {
    toast.warning(message, { ...defaultConfig, ...config });
  }
};

export const ToastContainer = toast.ToastContainer;