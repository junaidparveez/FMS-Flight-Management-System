// import { createBrowserRouter } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
// import HomePage from "./pages/HomePage";
// import Flights from "./pages/Flights";
// import Booking from "./pages/Booking";
import Register from "./pages/Register";
import DashBoard from "./pages/DashBoard";
import Flights from "./pages/Flights";
const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <DashBoard />,
  },
  {
    path: "/flights",
    element: <Flights />,
  },
  // {
  //   path: "/booking",
  //   element: <Booking />,
  // },
  {
    path: "/register",
    element: <Register />,
  },
  // {
  //   path: "/dashboard",
  //   element: <DashBoard />,
  // },
]);

export default AppRouter;
