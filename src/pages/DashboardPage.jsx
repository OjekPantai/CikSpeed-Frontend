import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Users, Car, Calendar, Wrench } from "lucide-react";

const Dashboard = () => {
  // Data dummy untuk statistik
  const statsData = [
    {
      title: "Total Pelanggan",
      value: "2,350",
      icon: Users,
      trend: "+12%",
      trendUp: true,
    },
    {
      title: "Total Kendaraan",
      value: "1,890",
      icon: Car,
      trend: "+8%",
      trendUp: true,
    },
    {
      title: "Reservasi Bulan Ini",
      value: "245",
      icon: Calendar,
      trend: "+23%",
      trendUp: true,
    },
    {
      title: "Servis dalam Proses",
      value: "18",
      icon: Wrench,
      trend: "-5%",
      trendUp: false,
    },
  ];

  // Data dummy untuk grafik reservasi
  const reservationData = [
    { name: "Jan", total: 150 },
    { name: "Feb", total: 180 },
    { name: "Mar", total: 210 },
    { name: "Apr", total: 245 },
    { name: "Mei", total: 235 },
    { name: "Jun", total: 280 },
  ];

  // Data dummy untuk jenis servis terpopuler
  const popularServices = [
    { name: "Ganti Oli", total: 145 },
    { name: "Tune Up", total: 98 },
    { name: "Service Rem", total: 76 },
    { name: "Ganti Ban", total: 65 },
    { name: "AC Service", total: 54 },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat, index) => (
          <Card key={index} className="bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">
                {stat.value}
              </div>
              <p
                className={`text-xs ${
                  stat.trendUp
                    ? "text-green-500 dark:text-green-400"
                    : "text-red-500 dark:text-red-400"
                } flex items-center`}
              >
                {stat.trend} dari bulan lalu
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Reservation Chart */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Reservasi Servis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={reservationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="total" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Popular Services */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Jenis Servis Terpopuler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {popularServices.map((service, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-full flex justify-between items-center">
                    <span className="text-sm font-medium">{service.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {service.total} reservasi
                    </span>
                  </div>
                  <div className="ml-4 w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{
                        width: `${
                          (service.total / popularServices[0].total) * 100
                        }%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Reservations */}
      <Card>
        <CardHeader>
          <CardTitle>Reservasi Terbaru</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-medium">
              <div>Pelanggan</div>
              <div>Kendaraan</div>
              <div>Jenis Servis</div>
              <div>Status</div>
            </div>
            <div className="space-y-4">
              {[
                {
                  customer: "Budi Santoso",
                  vehicle: "Toyota Avanza 2020",
                  service: "Ganti Oli",
                  status: "Dalam Proses",
                },
                {
                  customer: "Ani Wijaya",
                  vehicle: "Honda Jazz 2019",
                  service: "Tune Up",
                  status: "Menunggu",
                },
                {
                  customer: "Dedi Supriyadi",
                  vehicle: "Suzuki Ertiga 2021",
                  service: "Service Rem",
                  status: "Selesai",
                },
              ].map((reservation, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-4 gap-4"
                >
                  <div>{reservation.customer}</div>
                  <div>{reservation.vehicle}</div>
                  <div>{reservation.service}</div>
                  <div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        reservation.status === "Selesai"
                          ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100"
                          : reservation.status === "Dalam Proses"
                          ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100"
                          : "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100"
                      }`}
                    >
                      {reservation.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
