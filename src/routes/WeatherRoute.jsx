import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/Home";
import { ForecastPage } from "../pages/ForecastPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/forecastpage",
    element: <ForecastPage />
  }
]);
