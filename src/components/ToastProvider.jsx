import { createContext, useCallback, useContext, useState } from 'react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const push = useCallback((msg, type = 'info', ttl = 4000) => {
    const id = Math.random().toString(36).slice(2);
    setToasts(t => [...t, { id, msg, type }]);
    if (ttl > 0) setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), ttl);
  }, []);

  const remove = useCallback(id => setToasts(t => t.filter(x => x.id !== id)), []);

  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      <div className="toast-stack" aria-live="polite" aria-atomic="true">
        {toasts.map(t => (
          <div key={t.id} className={`toast-item ${t.type}`}> 
            <span>{t.msg}</span>
            <button onClick={() => remove(t.id)} aria-label="Жабу">×</button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToasts = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToasts must be used inside ToastProvider');
  return ctx;
};
