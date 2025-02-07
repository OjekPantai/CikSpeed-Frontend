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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EditSymptomModal = ({ open, onClose, symptom, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (symptom) {
      setFormData({
        name: symptom.name || "",
        description: symptom.description || "",
        category: symptom.category || "",
      });
      setError(null);
    }
  }, [symptom]);

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
      if (!symptom) {
        throw new Error("Data gejala tidak ditemukan");
      }

      if (
        !formData.name.trim() ||
        !formData.description.trim() ||
        !formData.category.trim()
      ) {
        throw new Error("Semua field harus diisi");
      }

      const symptomData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        category: formData.category.trim(),
      };

      await onSubmit(symptom.id, symptomData);
      onClose();
    } catch (err) {
      console.error("Error updating symptom:", err);
      setError(err.message || "Gagal memperbarui data gejala");
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
          <DialogTitle>Edit Data Gejala</DialogTitle>
          <DialogDescription>
            Ubah detail data gejala kendaraan
          </DialogDescription>
        </AlertDialogHeader>

        {error && (
          <div className="text-red-500 text-sm p-2 bg-red-50 rounded">
            Error: {error}
          </div>
        )}

        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="name">Nama Gejala</Label>
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
            <Label htmlFor="description">Deskripsi</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="flex justify-between items-center">
            <Label htmlFor="category">Kategori Servis</Label>
            <Select
              value={formData.category}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, category: value }))
              }
              disabled={isSubmitting}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Jenis Servis" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Servis Ringan">Servis Ringan</SelectItem>
                <SelectItem value="Servis Besar">Servis Besar</SelectItem>
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

export default EditSymptomModal;
