import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Form, useNavigation, redirect, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import customFetch from "../utils/customFetch";
import { FormRow, FormRowSelect } from "../components";

export const loader = async ({ params }) => {
  const id = params.id;
  try {
    const { data } = await customFetch.get(`/jobRoute/job/${id}`);
    toast.success("job fetched successfully");
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect("../All-Jobs");
  }
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);

  try {
    await customFetch.patch(`/jobRoute/job/${params.id}`, data);
    toast.success("login successful");
    return redirect("../All-jobs");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};
const EditJob = () => {
  const { job } = useLoaderData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title"></h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="position"
            defaultValue={job.position}
          ></FormRow>
          <FormRow
            type="text"
            name="company"
            defaultValue={job.company}
          ></FormRow>
          <FormRow
            type="text"
            name="jobLocation"
            defaultValue={job.jobLocation}
          ></FormRow>
          <FormRowSelect
            name="jobStatus"
            labelText="jobStatus"
            defaultValue={job.jobStatus}
            list={Object.values(JOB_STATUS)}
          ></FormRowSelect>
          <FormRowSelect
            name="jobType"
            labelText="jobType"
            defaultValue={job.jobType}
            list={Object.values(JOB_TYPE)}
          ></FormRowSelect>
        </div>
        <button
          type="submit"
          className="btn btn-block form-btn "
          disabled={isSubmitting}
        >
          {isSubmitting ? "submitting..." : "submit"}
        </button>
      </Form>
    </Wrapper>
  );
};
export default EditJob;
