import { useState, useEffect } from "react";
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

const EditVehicleModal = ({ open, onClose, vehicle, onSubmit }) => {
  const [formData, setFormData] = useState({
    brand: "",
    type: "",
    production_year: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (vehicle) {
      setFormData({
        brand: vehicle.brand,
        type: vehicle.type,
        production_year: vehicle.production_year,
      });
    }
  }, [vehicle]);

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
      const year = parseInt(formData.production_year);
      if (isNaN(year) || year < 1900 || year > new Date().getFullYear()) {
        throw new Error("Invalid production year");
      }

      const vehicleData = {
        brand: formData.brand,
        type: formData.type,
        production_year: year,
      };

      await onSubmit(vehicle.id, vehicleData);
      onClose();
    } catch (err) {
      setError(err.message || "Failed to edit vehicle");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[480px] md:max-w-xl rounded-lg grid gap-6">
        <AlertDialogHeader>
          <DialogTitle>Edit Data Kendaraan</DialogTitle>
          <DialogDescription>Ubah detail data kendaraan</DialogDescription>
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
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Updating..." : "Update Vehicle"}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditVehicleModal;
