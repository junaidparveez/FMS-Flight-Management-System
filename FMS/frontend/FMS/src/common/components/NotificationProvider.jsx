import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

const NotificationProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const addNotification = (msg) => {
    setMessages((prev) => [...prev, msg]);
    // Auto-remove after some time
    setTimeout(() => {
      setMessages((prev) => prev.filter((m) => m !== msg));
    }, 3000);
  };

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {children}
      <div className="fixed top-4 right-4 space-y-2">
        {messages.map((msg, idx) => (
          <div key={idx} className="bg-gray-800 text-white p-2 rounded shadow">
            {msg}
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
