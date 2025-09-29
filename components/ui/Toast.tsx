
import React from 'react';
import { X } from 'lucide-react';
import { useNotification } from '../../hooks/useNotification';

const Toast: React.FC = () => {
  const { toast, hideToast } = useNotification();

  if (!toast.show) return null;

  const bgColor = toast.type === 'error' ? 'bg-red-500' : 'bg-green-500';

  return (
    <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg text-white ${bgColor}`}>
      <div className="flex items-center justify-between">
        <span>{toast.message}</span>
        <button onClick={hideToast} className="ml-4 text-white hover:text-gray-200">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;