import AddMechanicModal from "@/components/fragments/mechanic/AddMechanicModal";
import DeleteMechanicAlert from "@/components/fragments/mechanic/DeleteMechanicAlert";
import EditMechanicModal from "@/components/fragments/mechanic/EditMechanicModal";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import useMechanics from "@/hooks/useMechanics";
import { Edit, MoreHorizontal, PlusCircle, Trash } from "lucide-react";
import { useState } from "react";

const MechanicPage = () => {
  const {
    mechanics,
    selectedMechanic,
    setSelectedMechanic,
    deleteMechanic,
    editMechanic,
    addMechanic,
  } = useMechanics();

  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleDeleteClick = (mechanic) => {
    setSelectedMechanic(mechanic);
    setDeleteAlertOpen(true);
  };

  const handleEditClick = (mechanic) => {
    setSelectedMechanic(mechanic);
    setEditModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Mechanical Management
        </h2>
        <Button
          variant="outline"
          className="h-8 gap-1"
          onClick={() => setAddModalOpen(true)}
        >
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Tambah Mekanik
          </span>
        </Button>
      </div>
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mechanics.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No mechanics found
                  </TableCell>
                </TableRow>
              )}
              {mechanics.map((mechanic) => (
                <TableRow key={mechanic.id}>
                  <TableCell>{mechanic.name}</TableCell>
                  <TableCell>{mechanic.phone}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        mechanic.status === "Available"
                          ? "available"
                          : "unavailable"
                      }
                    >
                      {mechanic.status}
                    </Badge>
                  </TableCell>
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
                          onClick={() => handleEditClick(mechanic)}
                          className="text-green-600 cursor-pointer"
                        >
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteClick(mechanic)}
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

      <DeleteMechanicAlert
        open={deleteAlertOpen}
        onClose={() => setDeleteAlertOpen(false)}
        onConfirm={() => deleteMechanic(selectedMechanic.id)}
      />

      <AddMechanicModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={addMechanic}
      />

      <EditMechanicModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        mechanic={selectedMechanic}
        onSubmit={editMechanic}
      />
    </div>
  );
};

export default MechanicPage;
