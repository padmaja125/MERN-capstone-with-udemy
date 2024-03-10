import customFetch from "../utils/customFetch";
import Wrapper from "../assets/wrappers/AdminContainer";
import { useLoaderData, redirect } from "react-router-dom";
import { toast } from "react-toastify";

export const loader = async () => {
  try {
    const resp = await customFetch.get("/user/admin/app-stats");
    return resp.data;
  } catch (error) {
    toast.error("not authorized to get");
    return redirect("/dashboard");
  }
};
const Admin = () => {
  const { data } = useLoaderData();
  const { user, jobs } = data;
  console.log(user,jobs);
  return (
    <Wrapper>
      <h1>admin</h1>
    </Wrapper>
  );
};
export default Admin;
