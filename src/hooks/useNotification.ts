import { toast } from 'react-toastify';

export const useNotification = () => {
  return (message: string, type: 'success' | 'error') => {
    if (type === 'success') {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };
};
