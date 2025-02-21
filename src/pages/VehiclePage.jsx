import { useState } from "react";
import useVehicles from "@/hooks/useVehicles";
import DeleteVehicleAlert from "@/components/fragments/vehicle/DeleteVehicleAlert";
import DetailVehicleModal from "@/components/fragments/vehicle/DetailVehicleModal";
import AddVehicleModal from "@/components/fragments/vehicle/AddVehicleModal";
import EditVehicleModal from "@/components/fragments/vehicle/EditVehicleModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Edit,
  Eye,
  MoreHorizontal,
  PlusCircle,
  Search,
  Trash,
} from "lucide-react";
import { Input } from "@/components/ui/input";

const VehiclePage = () => {
  const {
    vehicles,
    selectedVehicle,
    setSelectedVehicle,
    addVehicle,
    deleteVehicle,
    editVehicle,
    loading,
    error,
    page,
    setPage,
    limit,
    setLimit,
    totalPages,
    search,
    updateSearch,
  } = useVehicles();

  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleDetailClick = (vehicle) => {
    setSelectedVehicle(vehicle);
    setDetailModalOpen(true);
  };

  const handleDeleteClick = (vehicle) => {
    setSelectedVehicle(vehicle);
    setDeleteAlertOpen(true);
  };

  const handleEditClick = (vehicle) => {
    setSelectedVehicle(vehicle);
    setEditModalOpen(true);
  };

  const handleSearchChange = (e) => {
    updateSearch(e.target.value);
  };

  return (
    <div className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-4 border-b dark:border-gray-700">
          <h2 className="text-3xl font-bold tracking-tight">
            Vehicle Management
          </h2>
          <Button
            variant="outline"
            className="h-8 gap-1"
            onClick={() => setAddModalOpen(true)}
          >
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Tambah Kendaraan
            </span>
          </Button>
        </div>

        {/* Search Input */}
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Search by brand..."
                className="pl-10 w-64 h-10" // Atur lebar dan tinggi sesuai kebutuhan
                value={search}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>

        <Card>
          <CardContent>
            {loading ? (
              <div className="text-center">Loading...</div>
            ) : error ? (
              <div className="text-red-500 text-center py-6">{error}</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-b dark:border-gray-700">
                    <TableHead className="w-1/4">Brand</TableHead>
                    <TableHead className="w-1/4">Type</TableHead>
                    <TableHead className="w-1/4">Production Year</TableHead>
                    <TableHead className="w-1/4">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vehicles.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="h-24 text-center">
                        No vehicles found
                      </TableCell>
                    </TableRow>
                  )}
                  {vehicles.map((vehicle) => (
                    <TableRow
                      key={vehicle.id}
                      className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <TableCell>{vehicle.brand}</TableCell>
                      <TableCell>{vehicle.type}</TableCell>
                      <TableCell>{vehicle.production_year}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                              onClick={() => handleDetailClick(vehicle)}
                              className="text-blue-600 cursor-pointer"
                            >
                              <Eye className="mr-2 h-4 w-4" /> Detail
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleEditClick(vehicle)}
                              className="text-green-600 cursor-pointer"
                            >
                              <Edit className="mr-2 h-4 w-4" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteClick(vehicle)}
                              className="text-red-600 cursor-pointer"
                            >
                              <Trash className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

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
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={page === totalPages}
            >
              Next
            </Button>
          </div>
        )}

        <DetailVehicleModal
          open={detailModalOpen}
          onClose={() => setDetailModalOpen(false)}
          vehicle={selectedVehicle}
        />

        <DeleteVehicleAlert
          open={deleteAlertOpen}
          onClose={() => setDeleteAlertOpen(false)}
          onConfirm={() => deleteVehicle(selectedVehicle.id)}
        />

        <AddVehicleModal
          open={addModalOpen}
          onClose={() => setAddModalOpen(false)}
          onSubmit={addVehicle}
        />

        <EditVehicleModal
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          vehicle={selectedVehicle}
          onSubmit={editVehicle}
        />
      </div>
    </div>
  );
};

export default VehiclePage;
