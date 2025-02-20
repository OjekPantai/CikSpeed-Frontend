import { useState } from "react";
import useVehicles from "@/hooks/useVehicles";
import DeleteVehicleAlert from "@/components/fragments/vehicle/DeleteVehicleAlert";
import DetailVehicleModal from "@/components/fragments/vehicle/DetailVehicleModal";
import AddVehicleModal from "@/components/fragments/vehicle/AddVehicleModal";
import EditVehicleModal from "@/components/fragments/vehicle/EditVehicleModal"; // Import the new modal
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
import { Edit, Eye, MoreHorizontal, PlusCircle, Trash } from "lucide-react";

const VehiclePage = () => {
  const {
    vehicles,
    selectedVehicle,
    setSelectedVehicle,
    addVehicle,
    deleteVehicle,
    editVehicle,
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between space-y-2">
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

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
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
                <TableRow key={vehicle.id}>
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
        </CardContent>
      </Card>

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
  );
};

export default VehiclePage;
