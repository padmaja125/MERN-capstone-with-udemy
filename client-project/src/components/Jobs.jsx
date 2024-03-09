import { Link, Form } from "react-router-dom";
import Wrapper from "../assets/wrappers/JobInfo";
import JobDetails from "./JobDetails";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";

// extend the lib from day package
day.extend(advancedFormat);

const Jobs = ({
  company,
  createdAt,
  createdBy,
  jobLocation,
  jobStatus,
  jobType,
  position,
  updatedAt,
  _id,
}) => {
  // will give as 2024-03-08T03:40:50.358Z
  //console.log(createdAt);
  const date = day(createdAt).format("DD MM YYYY");
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobDetails icon={<FaLocationArrow />} text={jobLocation} />
          <JobDetails icon={<FaCalendarAlt />} text={date} />
          <JobDetails icon={<FaBriefcase />} text={jobType} />
          <div className={`status ${jobStatus}`}>{jobStatus}</div>
        </div>
      </div>
      <footer className="actions">
        <Link to={`../edit-job/${_id}`} className="btn edit-btn">
          Edit
        </Link>
        <Form method="post" action={`../delete-job/${_id}`}>
          <button type="submit" className="btn delete-btn">
            Delete
          </button>
        </Form>
      </footer>
    </Wrapper>
  );
};
export default Jobs;
