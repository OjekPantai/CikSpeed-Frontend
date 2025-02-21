import { useState, useEffect } from "react";
import customApi from "@/services/api";
import { useToast } from "./use-toast";

const useReservations = () => {
  const { toast } = useToast();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState({
    search: "",
    status: ["Pending", "In Progress"],
    startDate: "",
    endDate: "",
    limit: 10,
  });

  useEffect(() => {
    fetchReservations();
  }, [page, filters]);

  const fetchReservations = async () => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams({
        page,
        limit: filters.limit,
        search: filters.search,
      });

      // Menambahkan status dengan format yang benar
      filters.status.forEach((status) => queryParams.append("status", status));

      if (filters.startDate) queryParams.append("startDate", filters.startDate);
      if (filters.endDate) queryParams.append("endDate", filters.endDate);

      const response = await customApi.get(
        `/reservations?${queryParams.toString()}`
      );
      setReservations(response.data.reservations);
      setTotalPages(response.data.totalPages);
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

  return {
    reservations,
    loading,
    error,
    page,
    totalPages,
    setPage,
    filters,
    setFilters,
    refresh: fetchReservations,
  };
};

export default useReservations;
