import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./components/theme/theme-provider";
import PublicLayout from "./layouts/PublicLayout";
import DashboardPage from "./pages/DashboardPage";
import ReservationPage from "./pages/ReservationPage";
import SymptomPage from "./pages/SymptomPage";
import VehiclePage from "./pages/VehiclePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

import { action as LoginAction } from "./pages/auth/LoginPage";
import { action as RegisterAction } from "./pages/auth/RegisterPage";

import { store } from "./store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "/reservation",
        element: <ReservationPage />,
      },
      {
        path: "/symptom",
        element: <SymptomPage />,
      },
      {
        path: "/vehicle",
        element: <VehiclePage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
    action: LoginAction(store),
  },
  {
    path: "/register",
    element: <RegisterPage />,
    action: RegisterAction(store),
  },
]);

const App = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="bengkel-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
