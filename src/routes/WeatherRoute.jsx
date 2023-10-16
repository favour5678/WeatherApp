import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/Home";
import { WeatherPage } from "../pages/WeatherPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/weatherpage",
    element: <WeatherPage />
  }
]);
