import { useState, useEffect } from "react";
import customApi from "@/services/api";
import { useToast } from "./use-toast";

const useUsers = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await customApi.get("/users");
      setUsers(response.data.data || response.data);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to fetch users";
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

  return { users, fetchUsers, loading, error };
};

export default useUsers;
