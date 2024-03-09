import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { redirect } from "react-router-dom";

export const action = async ({ params }) => {
  try {
    await customFetch.delete(`/jobRoute/job/${params.id}`);
    toast.success("login successful");
    return redirect("../All-jobs");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const DeleteJob = () => {
  return <div>DeleteJob</div>;
};
export default DeleteJob;
