import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";
import { useSelector } from "react-redux";
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
import MechanicPage from "./pages/MechanicPage";
import HIstoryPage from "./pages/HIstoryPage";

const ProtectedRoute = () => {
  const user = useSelector((state) => state.userState.user);
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />, // Proteksi seluruh halaman kecuali login & register
    children: [
      {
        element: <PublicLayout />,
        children: [
          {
            index: true,
            element: <DashboardPage />,
          },
          {
            path: "reservation",
            element: <ReservationPage />,
          },
          {
            path: "symptom",
            element: <SymptomPage />,
          },
          {
            path: "vehicle",
            element: <VehiclePage />,
          },
          {
            path: "mechanic",
            element: <MechanicPage />,
          },
          {
            path: "history",
            element: <HIstoryPage />,
          },
        ],
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
