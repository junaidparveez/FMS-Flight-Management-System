import React, { useEffect } from "react";
import AppRouter from "./AppRouter";
import { AuthProvider } from "./common/context/AuthContext";
import { ThemeProvider } from "./common/context/ThemeContext";
import NotificationProvider from "./common/components/NotificationProvider";
import { useNavigate } from "react-router-dom";
function App() {
  let navigate = useNavigate();
  useEffect(() => {
    function clearLocalStorageAndLogout() {
      alert(
        "Your session has expired. You have been logged out for security reasons."
      );
      navigate("/login");
      localStorage.clear();
    }

    function scheduleClear() {
      return window.setTimeout(() => {
        clearLocalStorageAndLogout();
        scheduleClear();
      }, 10 * 60 * 1000); 
    }

    const timeoutId = scheduleClear();

    return () => clearTimeout(timeoutId);
  }, []);
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
