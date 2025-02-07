import FormAuth from "@/components/fragments/auth/FormAuth";
import { toast } from "@/hooks/use-toast";
import customApi from "@/services/api";
import { redirect } from "react-router-dom";
import { login } from "@/features/userSlice";

export const action =
  (store) =>
  async ({ request }) => {
    const formInputData = await request.formData();
    const data = Object.fromEntries(formInputData);

    try {
      const response = await customApi.post("/auth/login", data);
      store.dispatch(login(response.data));
      toast({
        title: "Success!",
        description: "Login successfully",
      });
      return redirect("/");
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      console.log(errorMessage);
      toast({
        title: "Error!",
        description: errorMessage,
        variant: "destructive",
      });
      return null;
    }
  };

const LoginPage = () => {
  return (
    <div>
      <FormAuth isRegister={false} />
    </div>
  );
};

export default LoginPage;
