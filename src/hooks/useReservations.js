import { useState, useEffect } from "react";
import customApi from "@/services/api";
import { useToast } from "./use-toast";

const useReservations = () => {
  const { toast } = useToast();
  const [reservations, setReservations] = useState([]);
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
      console.log(response.data);
      setReservations(response.data.reservations || []);
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

  return { reservations, fetchHistoryReservations, loading, error };
};

export default useReservations;
