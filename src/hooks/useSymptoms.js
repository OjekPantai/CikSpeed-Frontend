import { useState, useEffect } from "react";
import customApi from "@/services/api";
import { useToast } from "./use-toast";

const useSymptoms = () => {
  const { toast } = useToast();
  const [symptoms, setSymptoms] = useState([]);
  const [selectedSymptom, setSelectedSymptom] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSymptoms();
  }, []);

  const fetchSymptoms = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await customApi.get("/symptoms");
      setSymptoms(response.data.data || response.data);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to fetch symptoms";
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

  const addSymptom = async (newSymptom) => {
    setLoading(true);
    setError(null);
    try {
      const response = await customApi.post("/symptoms", newSymptom);
      const addedSymptom = response.data.data || response.data;
      setSymptoms((prevSymptoms) => [...prevSymptoms, addedSymptom]);
      toast({
        title: "Success",
        description: "Symptom added successfully!",
      });
      return addedSymptom;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to add symptom";
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

  const editSymptom = async (symptomId, updatedSymptom) => {
    setLoading(true);
    setError(null);
    try {
      const response = await customApi.put(
        `/symptoms/${symptomId}`,
        updatedSymptom
      );
      const editedSymptom = response.data.data || response.data;
      setSymptoms((prevSymptoms) =>
        prevSymptoms.map((s) => (s.id === symptomId ? editedSymptom : s))
      );
      toast({
        title: "Success",
        description: "Symptom updated successfully!",
      });
      return editedSymptom;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to edit symptom";
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

  const deleteSymptom = async (symptomId) => {
    setLoading(true);
    setError(null);
    try {
      await customApi.delete(`/symptoms/${symptomId}`);
      setSymptoms((prevSymptoms) =>
        prevSymptoms.filter((s) => s.id !== symptomId)
      );
      toast({
        title: "Success",
        description: "Symptom deleted successfully!",
      });
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to delete symptom";
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
    symptoms,
    selectedSymptom,
    setSelectedSymptom,
    addSymptom,
    editSymptom,
    deleteSymptom,
    fetchSymptoms,
    loading,
    error,
  };
};

export default useSymptoms;
