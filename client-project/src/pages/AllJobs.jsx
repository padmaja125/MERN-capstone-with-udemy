import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { useLoaderData } from "react-router-dom";
import { DisplayAllJobContainer, SearchJobContainer } from "../components";
import { createContext, useContext } from "react";

//create global context to send props to the child components
const AllJobsContext = createContext();

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/jobRoute/jobs");
    toast.success("got all data");
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
};

const AllJobs = () => {
  const { jobs } = useLoaderData();
  return (
    <AllJobsContext.Provider value={{ jobs }}>
      <SearchJobContainer />
      <DisplayAllJobContainer />
    </AllJobsContext.Provider>
  );
};

export const useAllJobsContext = () => useContext(AllJobsContext);

export default AllJobs;
