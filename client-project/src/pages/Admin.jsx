import customFetch from "../utils/customFetch";
import Wrapper from "../assets/wrappers/AdminContainer";
import { useLoaderData, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import StatsItem from "../components/StatsItem";
import { FaCalendarCheck, FaSuitcaseRolling } from "react-icons/fa";
export const loader = async () => {
  try {
    const resp = await customFetch.get("/user/admin/app-stats");
    return resp;
  } catch (error) {
    toast.error("not authorized to get");
    return redirect("/dashboard");
  }
};
const Admin = () => {
  const { data } = useLoaderData();
  const { user, jobs } = data;
  return (
    <Wrapper>
      <StatsItem
        count={user}
        title="Current users"
        bgc="#fcefc7"
        icon={<FaSuitcaseRolling />}
        color="#e9b949"
      ></StatsItem>
      <StatsItem
        count={jobs}
        title="Total jobs"
        bgc="#fcefc7"
        icon={<FaCalendarCheck />}
        color="#e0e8f9"
      ></StatsItem>
    </Wrapper>
  );
};
export default Admin;
