import React from 'react';
import AppRouter from './AppRouter';
import { AuthProvider } from './common/context/AuthContext';
import { ThemeProvider } from './common/context/ThemeContext';
import NotificationProvider from './common/components/NotificationProvider';

function App() {
  return (
   
    <NotificationProvider>
      <AuthProvider>
        <ThemeProvider>
          <AppRouter />
        </ThemeProvider>
      </AuthProvider>
    </NotificationProvider>
  );
}
export default App;
