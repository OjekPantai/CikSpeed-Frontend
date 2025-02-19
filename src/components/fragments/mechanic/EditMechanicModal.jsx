/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EditMechanicModal = ({ open, onClose, mechanic, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    status: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (mechanic) {
      setFormData({
        name: mechanic.name || "",
        phone: mechanic.phone || "",
        status: mechanic.status || "",
      });
      setError(null);
    }
  }, [mechanic]);

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
      if (!mechanic) {
        throw new Error("Data gejala tidak ditemukan");
      }

      if (
        !formData.name.trim() ||
        !formData.phone.trim() ||
        !formData.status.trim()
      ) {
        throw new Error("Semua field harus diisi");
      }

      const mechanicData = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        status: formData.status.trim(),
      };

      await onSubmit(mechanic.id, mechanicData);
      onClose();
    } catch (err) {
      setError(err.message || "Gagal memperbarui data mekanik");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setError(null);
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-[480px] md:max-w-xl rounded-lg grid gap-6">
        <AlertDialogHeader>
          <DialogTitle>Edit Data Mekanik</DialogTitle>
          <DialogDescription>Ubah detail data mekanik</DialogDescription>
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
              disabled={isSubmitting}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="phone">Nomor Telfon</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="flex justify-between items-center">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, status: value }))
              }
              disabled={isSubmitting}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Available">Available</SelectItem>
                <SelectItem value="Unavailable">Unavailable</SelectItem>
              </SelectContent>
            </Select>
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
                {isSubmitting ? "Updating..." : "Update"}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditMechanicModal;
