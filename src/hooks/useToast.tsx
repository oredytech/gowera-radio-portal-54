
import { useState, useCallback } from 'react';

interface Toast {
  id: string;
  title: string;
  description?: string;
  variant?: 'default' | 'destructive';
  duration?: number;
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback(({ title, description, variant = 'default', duration = 3000 }: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast = { id, title, description, variant, duration };
    
    setToasts((prevToasts) => [...prevToasts, newToast]);
    
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, duration);
    
    return id;
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  return { toast, toasts, dismissToast };
}

// Composant de toast
export function ToastContainer({ toasts, dismissToast }: { toasts: Toast[], dismissToast: (id: string) => void }) {
  if (toasts.length === 0) return null;
  
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`p-4 rounded-md shadow-md flex justify-between items-start max-w-sm ${
            toast.variant === 'destructive' ? 'bg-destructive text-destructive-foreground' : 'bg-card text-card-foreground'
          }`}
        >
          <div>
            <h4 className="font-medium">{toast.title}</h4>
            {toast.description && <p className="text-sm mt-1">{toast.description}</p>}
          </div>
          <button 
            onClick={() => dismissToast(toast.id)} 
            className="ml-4 text-sm opacity-70 hover:opacity-100"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
