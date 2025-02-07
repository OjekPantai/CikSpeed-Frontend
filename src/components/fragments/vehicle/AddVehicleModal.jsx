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

const AddVehicleModal = ({ open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    brand: "",
    type: "",
    production_year: "",
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
      // Validate production_year
      const year = parseInt(formData.production_year);
      if (isNaN(year) || year < 1900 || year > new Date().getFullYear()) {
        throw new Error("Invalid production year");
      }

      // Convert data to the format expected by the API
      const vehicleData = {
        brand: formData.brand,
        type: formData.type,
        production_year: year,
      };

      // Call the onSubmit function and await its result
      const result = await onSubmit(vehicleData);

      // Reset form and close modal only if submission was successful
      setFormData({ brand: "", type: "", production_year: "" });
      onClose();
    } catch (err) {
      setError(err.message || "Failed to add vehicle");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({ brand: "", type: "", production_year: "" });
    setError(null);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-[480px] md:max-w-xl rounded-lg grid gap-6">
        <AlertDialogHeader>
          <DialogTitle>Tambah Data Kendaraan</DialogTitle>
          <DialogDescription>Masukkan detail data kendaraan</DialogDescription>
        </AlertDialogHeader>

        {error && (
          <div className="text-red-500 text-sm p-2 bg-red-50 rounded">
            Error: {error}
          </div>
        )}

        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="brand">Merk</Label>
            <Input
              id="brand"
              name="brand"
              type="text"
              value={formData.brand}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="type">Tipe</Label>
            <Input
              id="type"
              name="type"
              type="text"
              value={formData.type}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="production_year">Tahun Produksi</Label>
            <Input
              id="production_year"
              name="production_year"
              type="number"
              min="1900"
              max={new Date().getFullYear()}
              value={formData.production_year}
              onChange={handleChange}
              required
            />
          </div>

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
                {isSubmitting ? "Adding..." : "Add Vehicle"}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddVehicleModal;
