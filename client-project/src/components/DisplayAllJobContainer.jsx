import Jobs from "./Jobs";
import Wrapper from "../assets/wrappers/JobsContainer";
import { useAllJobsContext } from "../pages/AllJobs";

const DisplayAllJobContainer = () => {
  const { jobs } = useAllJobsContext();

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div className="jobs">
        {jobs.map((job) => {
          return <Jobs key={job._id} {...job} />;
        })}
      </div>
    </Wrapper>
  );
};
export default DisplayAllJobContainer;
