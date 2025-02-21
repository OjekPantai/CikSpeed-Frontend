import { useState } from "react";
import useSymptoms from "@/hooks/useSymptoms";
import AddSymptomModal from "@/components/fragments/symptom/AddSymptomModal";
import EditSymptomModal from "@/components/fragments/symptom/EditSymptomModal";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, Eye, MoreHorizontal, PlusCircle, Trash } from "lucide-react";
import DeleteSymptomAlert from "@/components/fragments/symptom/DeleteSymptomAlert";

const SymptomPage = () => {
  const {
    symptoms,
    selectedSymptom,
    setSelectedSymptom,
    addSymptom,
    editSymptom,
    deleteSymptom,
  } = useSymptoms();
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleEditClick = (symptom) => {
    setSelectedSymptom(symptom);
    setEditModalOpen(true);
  };

  const handleDetailClick = (symptom) => {
    console.log(symptom);
  };

  const handleDeleteClick = (symptom) => {
    setSelectedSymptom(symptom);
    setDeleteAlertOpen(true);
  };

  return (
    <div className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-4 border-b dark:border-gray-700">
          <h2 className="text-3xl font-bold tracking-tight">
            Symptom Management
          </h2>
          <Button
            variant="outline"
            className="h-10 gap-1"
            onClick={() => setAddModalOpen(true)}
          >
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Symptom
            </span>
          </Button>
        </div>

        <Card>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-b dark:border-gray-700">
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Service Type</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {symptoms.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      No symptoms found
                    </TableCell>
                  </TableRow>
                )}
                {symptoms.map((symptom) => (
                  <TableRow
                    key={symptom.id}
                    className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <TableCell>{symptom.name}</TableCell>
                    <TableCell>{symptom.description}</TableCell>
                    <TableCell>{symptom.category}</TableCell>
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
                            onClick={() => handleDetailClick(symptom)}
                            className="text-blue-600 cursor-pointer"
                          >
                            <Eye className="mr-2 h-4 w-4" /> Detail
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleEditClick(symptom)}
                            className="text-green-600 cursor-pointer"
                          >
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteClick(symptom)}
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
      </div>

      <AddSymptomModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={addSymptom}
      />

      <DeleteSymptomAlert
        open={deleteAlertOpen}
        onClose={() => setDeleteAlertOpen(false)}
        onConfirm={() => deleteSymptom(selectedSymptom.id)}
      />

      <EditSymptomModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        symptom={selectedSymptom}
        onSubmit={editSymptom}
      />
    </div>
  );
};

export default SymptomPage;
