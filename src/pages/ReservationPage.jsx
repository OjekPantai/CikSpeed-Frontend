import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useReservations from "@/hooks/useReservations";
import { Eye, MoreHorizontal, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

const ReservationPage = () => {
  const {
    reservations,
    loading,
    error,
    page,
    totalPages,
    setPage,
    filters,
    setFilters,
  } = useReservations();

  const handleDetailClick = (id) => {
    console.log("clicked", id);
  };

  // const handleSearch = (e) => {
  //   setFilters((prev) => ({ ...prev, search: e.target.value.trim() }));
  //   setPage(1);
  // };

  const handleStatusChange = (value) => {
    setFilters((prev) => ({ ...prev, status: [value] }));
    setPage(1);
  };

  const handleDateChange = (date, field) => {
    setFilters((prev) => ({
      ...prev,
      [field]: date ? format(date, "yyyy-MM-dd") : "",
    }));
    setPage(1);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg font-medium">Loading reservations...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500 dark:text-red-400 font-medium">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-4 border-b dark:border-gray-700">
          <h2 className="text-3xl font-bold tracking-tight">
            Daftar Reservasi
          </h2>
        </div>

        {/* Filters */}
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1 min-w-[200px]">
            {/* <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Cari nama, nomor telepon..."
                className="pl-10"
                value={filters.search}
                onChange={handleSearch}
              />
            </div> */}
          </div>

          <Select value={filters.status[0]} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Pending">Menunggu Konfirmasi</SelectItem>
              <SelectItem value="In Progress">Dalam Antrian</SelectItem>
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[180px]">
                <CalendarIcon className="mr-2 h-4 w-4" />
                Tanggal Mulai
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={
                  filters.startDate ? new Date(filters.startDate) : undefined
                }
                onSelect={(date) => handleDateChange(date, "startDate")}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[180px]">
                <CalendarIcon className="mr-2 h-4 w-4" />
                Tanggal Akhir
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={
                  filters.endDate ? new Date(filters.endDate) : undefined
                }
                onSelect={(date) => handleDateChange(date, "endDate")}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b dark:border-gray-700">
                    <TableHead className="w-24 py-4 font-semibold">
                      No Antrian
                    </TableHead>
                    <TableHead className="w-40 py-4 font-semibold">
                      Tanggal Booking
                    </TableHead>
                    <TableHead className="w-32 py-4 font-semibold">
                      Waktu
                    </TableHead>
                    <TableHead className="w-48 py-4 font-semibold">
                      Nama
                    </TableHead>
                    <TableHead className="w-40 py-4 font-semibold">
                      Nomor Telepon
                    </TableHead>
                    <TableHead className="w-40 py-4 font-semibold">
                      Status
                    </TableHead>
                    <TableHead className="w-24 py-4 font-semibold">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reservations?.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className="h-32 text-center text-gray-500 dark:text-gray-400"
                      >
                        Tidak ada data reservasi
                      </TableCell>
                    </TableRow>
                  ) : (
                    reservations?.map((reservation) => (
                      <TableRow
                        key={reservation.id}
                        className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                      >
                        <TableCell className="font-medium">
                          {reservation.queue_number}
                        </TableCell>
                        <TableCell>
                          {format(
                            new Date(reservation.service_date),
                            "dd MMMM yyyy",
                            { locale: id }
                          )}
                        </TableCell>
                        <TableCell className="text-gray-500 dark:text-gray-400">
                          -
                        </TableCell>
                        <TableCell className="font-medium">
                          {reservation.User.name}
                        </TableCell>
                        <TableCell>{reservation.User.phone}</TableCell>
                        <TableCell>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium
                            ${
                              reservation.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200"
                                : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200"
                            }`}
                          >
                            {reservation.status === "Pending"
                              ? "Menunggu Konfirmasi"
                              : "Dalam Antrian"}
                          </span>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                                className="hover:bg-gray-100 dark:hover:bg-gray-800"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-40">
                              <DropdownMenuLabel className="text-sm">
                                Actions
                              </DropdownMenuLabel>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleDetailClick(reservation.id)
                                }
                                className="text-blue-600 dark:text-blue-400 cursor-pointer"
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                Detail
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-2 py-4 mt-4">
                <Button
                  variant="outline"
                  onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (pageNum) => (
                      <Button
                        key={pageNum}
                        variant={pageNum === page ? "default" : "outline"}
                        onClick={() => setPage(pageNum)}
                        className="w-8 h-8 p-0"
                      >
                        {pageNum}
                      </Button>
                    )
                  )}
                </div>
                <Button
                  variant="outline"
                  onClick={() =>
                    setPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  disabled={page === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReservationPage;
