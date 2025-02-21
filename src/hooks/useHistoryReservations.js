import { useState, useEffect } from "react";
import customApi from "@/services/api";
import { useToast } from "./use-toast";

const useHistoryReservations = () => {
  const { toast } = useToast();
  const [historyReservations, setHistoryReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHistoryReservations();
  }, []);

  const fetchHistoryReservations = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await customApi.get("/reservations/history");
      setHistoryReservations(response.data.reservations || []);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to fetch reservations";
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

  return { historyReservations, fetchHistoryReservations, loading, error };
};

export default useHistoryReservations;
