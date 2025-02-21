import {
  LayoutDashboard,
  CalendarRange,
  AlertCircle,
  Car,
  Wrench,
  History,
  Users,
} from "lucide-react";

export const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: CalendarRange, label: "Reservasi", path: "/reservation" },
  { icon: AlertCircle, label: "Keluhan", path: "/symptom" },
  { icon: Car, label: "Kendaraan", path: "/vehicle" },
  { icon: Wrench, label: "Mekanik", path: "/mechanic" },
  { icon: History, label: "Riwayat", path: "/history" },
  { icon: Users, label: "Pelanggan", path: "/user" },
];
