import FormAuth from "@/components/fragments/auth/FormAuth";
import { register } from "@/features/userSlice";
import { toast } from "@/hooks/use-toast";
import customApi from "@/services/api";
import { redirect } from "react-router-dom";

export const action =
  (store) =>
  async ({ request }) => {
    const formInputData = await request.formData();
    const data = Object.fromEntries(formInputData);

    try {
      const response = await customApi.post("/auth/register", data);
      store.dispatch(register(response.data));
      toast({
        title: "Success! ",
        description: "Register successfully",
      });
      return redirect("/");
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      console.log(errorMessage);
      toast({
        title: "Error! ",
        description: errorMessage,
        variant: "destructive",
      });
      return null;
    }
  };

const RegisterPage = () => {
  return (
    <div>
      <FormAuth isRegister={true} />
    </div>
  );
};

export default RegisterPage;
