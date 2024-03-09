import {
  Form,
  redirect,
  useNavigation,
  useOutletContext,
} from "react-router-dom";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { FormRow, FormRowSelect } from "../components";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/jobRoute/jobs", data);
    toast.success("job added successfully");
    return redirect("/dashboard/all-jobs");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AddJob = () => {
  //functionalities
  const { user } = useOutletContext();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4>add job</h4>
        <FormRow type="text" name="position"></FormRow>
        <FormRow type="text" name="company"></FormRow>
        <FormRow
          type="text"
          name="jobLocation"
          defaultValue={user.location}
        ></FormRow>
        <FormRowSelect
          name="jobStatus"
          labelName="jobStatus"
          defaultValue={JOB_STATUS.APPLIED}
          list={Object.values(JOB_STATUS)}
        ></FormRowSelect>
        <FormRowSelect
          name="jobType"
          labelName="jobType"
          defaultValue={JOB_TYPE.FULL_TIME}
          list={Object.values(JOB_TYPE)}
        ></FormRowSelect>
        <button
          type="submit"
          className="btn btn-block form-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? "submitting..." : "submit"}
        </button>
      </Form>
    </Wrapper>
  );
};
export default AddJob;
