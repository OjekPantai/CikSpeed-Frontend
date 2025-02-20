import customApi from "@/services/api";
import { useState, useEffect } from "react";
import { useToast } from "./use-toast";

const useMechanics = () => {
  const { toast } = useToast();
  const [mechanics, setMechanics] = useState([]);
  const [selectedMechanic, setSelectedMechanic] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMechanics();
  }, []);

  const fetchMechanics = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await customApi.get("/mechanics");
      setMechanics(response.data.data || response.data);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to fetch mechanics";
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

  const addMechanic = async (newMechanic) => {
    setLoading(true);
    setError(null);

    try {
      const response = await customApi.post("/mechanics", newMechanic);
      const addedMechanic = response.data.data || response.data;
      setMechanics((prevMechanics) => [...prevMechanics, addedMechanic]);

      toast({
        title: "Success",
        description: "Mechanic added successfully!",
      });
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to add mechanic";
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

  const deleteMechanic = async (mechanicId) => {
    setLoading(true);
    setError(null);
    try {
      await customApi.delete(`/mechanics/${mechanicId}`);
      setMechanics((prevMechanics) =>
        prevMechanics.filter((m) => m.id !== mechanicId)
      );
      toast({
        title: "Success",
        description: "Mechanic deleted successfully!",
      });
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to delete mechanic";
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

  const editMechanic = async (mechaincId, updatedMechainc) => {
    setLoading(true);
    setError(null);
    try {
      const response = await customApi.put(
        `/mechanics/${mechaincId}`,
        updatedMechainc
      );
      const editedMechanic = response.data.data || response.data;

      setMechanics((prevMechanic) =>
        prevMechanic.map((v) => (v.id === mechaincId ? editedMechanic : v))
      );

      toast({
        title: "Success",
        description: "Kendaraan berhasil diperbarui!",
      });

      return editedMechanic;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Gagal mengedit mekanik";
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
    mechanics,
    selectedMechanic,
    setSelectedMechanic,
    loading,
    error,
    fetchMechanics,
    deleteMechanic,
    editMechanic,
    addMechanic,
  };
};

export default useMechanics;
