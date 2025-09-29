
import React, { createContext, useState, ReactNode } from 'react';

interface ToastState {
  show: boolean;
  message: string;
  type: 'success' | 'error';
}

interface NotificationContextType {
  toast: ToastState;
  showToast: (message: string, type?: 'success' | 'error') => void;
  hideToast: () => void;
}

export const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<ToastState>({ show: false, message: '', type: 'success' });

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      hideToast();
    }, 3000);
  };

  const hideToast = () => {
    setToast({ show: false, message: '', type: 'success' });
  };

  return (
    <NotificationContext.Provider value={{ toast, showToast, hideToast }}>
      {children}
    </NotificationContext.Provider>
  );
};