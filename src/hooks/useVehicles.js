import { useState, useEffect } from "react";
import customApi from "@/services/api";
import { useToast } from "./use-toast";

const useVehicles = () => {
  const { toast } = useToast();
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchVehicles();
  }, [page, limit, search]);

  const fetchVehicles = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await customApi.get("/vehicles", {
        params: { page, limit, search }, // Kirim page, limit, dan search sebagai parameter
      });
      setVehicles(response.data.data || response.data);
      setTotalPages(response.data.totalPages); // Set total halaman
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Gagal mengambil data kendaraan";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateSearch = (newSearch) => {
    setSearch(newSearch);
    setPage(1); // Reset ke halaman 1 saat melakukan pencarian
  };

  const addVehicle = async (newVehicle) => {
    setLoading(true);
    setError(null);

    try {
      const response = await customApi.post("/vehicles", newVehicle);
      const addedVehicle = response.data.data || response.data;
      setVehicles((prevVehicles) => [...prevVehicles, addedVehicle]);

      toast({
        title: "Success",
        description: "Kendaraan berhasil ditambahkan!",
      });

      return addedVehicle;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Gagal menambahkan kendaraan";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const deleteVehicle = async (vehicleId) => {
    setLoading(true);
    setError(null);
    try {
      await customApi.delete(`/vehicles/${vehicleId}`);
      setVehicles((prevVehicles) =>
        prevVehicles.filter((v) => v.id !== vehicleId)
      );

      toast({
        title: "Success",
        description: "Kendaraan berhasil dihapus!",
      });
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Gagal menghapus kendaraan";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const editVehicle = async (vehicleId, updatedVehicle) => {
    setLoading(true);
    setError(null);
    try {
      const response = await customApi.put(
        `/vehicles/${vehicleId}`,
        updatedVehicle
      );
      const editedVehicle = response.data.data || response.data;

      setVehicles((prevVehicles) =>
        prevVehicles.map((v) => (v.id === vehicleId ? editedVehicle : v))
      );

      toast({
        title: "Success",
        description: "Kendaraan berhasil diperbarui!",
      });

      return editedVehicle;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Gagal mengedit kendaraan";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    vehicles,
    selectedVehicle,
    setSelectedVehicle,
    addVehicle,
    deleteVehicle,
    fetchVehicles,
    loading,
    error,
    editVehicle,
    page,
    setPage,
    limit,
    setLimit,
    totalPages,
    search,
    updateSearch,
  };
};

export default useVehicles;
