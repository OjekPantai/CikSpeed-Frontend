/* eslint-disable react/prop-types */
import { useState } from "react";
import { AlertDialogHeader } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectItem } from "@/components/ui/select";

const AddMechanicModal = ({ open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    status: "Available",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // Call the onSubmit function and await its result
      await onSubmit(formData);

      // Reset form and close modal if submission is successful
      setFormData({ name: "", phone: "", status: "Available" });
      onClose();
    } catch (err) {
      setError(err.message || "Failed to add mechanic");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({ name: "", phone: "", status: "Available" });
    setError(null);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-[480px] md:max-w-xl rounded-lg grid gap-6">
        <AlertDialogHeader>
          <DialogTitle>Tambah Data Mekanik</DialogTitle>
          <DialogDescription>Masukkan detail mekanik</DialogDescription>
        </AlertDialogHeader>

        {error && (
          <div className="text-red-500 text-sm p-2 bg-red-50 rounded">
            Error: {error}
          </div>
        )}

        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="name">Nama</Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="phone">Nomor Telepon</Label>
            <Input
              id="phone"
              name="phone"
              type="text"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          {/* <div className="grid gap-2">
            <Label htmlFor="status">Status</Label>
            <Select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border rounded px-3 py-2"
              required
            >
              <option value="Available">Available</option>
              <option value="Unavailable">Unavailable</option>
            </Select>
          </div> */}

          <DialogFooter>
            <div className="grid grid-cols-2 gap-4">
              <Button
                type="button"
                variant="secondary"
                onClick={handleClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Adding..." : "Add Mechanic"}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddMechanicModal;
