import Jobs from "./Jobs";
import Wrapper from "../assets/wrappers/JobsContainer";
import { useAllJobsContext } from "../pages/AllJobs";
import PageBtnContainer from "./PageBtnContainer";

const DisplayAllJobContainer = () => {
  const { data } = useAllJobsContext();
  console.log(data);
  const { jobs, numOfPages, totalJobs } = data;

  if (!jobs) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {totalJobs}job{jobs.length > 1 && "s"}
      </h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <Jobs key={job._id} {...job} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};
export default DisplayAllJobContainer;
