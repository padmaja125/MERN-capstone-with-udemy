import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useNavigation, Form, useOutletContext } from "react-router-dom";
import { FormRow } from "../components";

//action on submit
export const action = async ({ request }) => {
  const formData = await request.formData();

  const file = formData.get("avatar");
  if (file && file.size > 50000000) {
    toast.error("Image size too large");
    return null;
  }

  try {
    console.log(formData);
    const resp = await customFetch.patch("/user/update-user", formData);
    console.log(resp);
    toast.success("Profile updated successfully");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
  return null;
};

const Profile = () => {
  const { user } = useOutletContext();
  const { name, lastName, email, location } = user;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="post" className="form" encType="multipart/form-data">
        <h4 className="form-title"> Profile</h4>
        <div>
          <div>
            <label>Select an image file (max 5 MB):</label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              className="form-input"
              accept="image/*"
            ></input>
          </div>
          <FormRow type="text" name="name" defaultValue={name} />
          <FormRow type="text" name="lastName" defaultValue={lastName} />
          <FormRow type="email" name="email" defaultValue={email} />
          <FormRow type="text" name="location" defaultValue={location} />
          <button
            className="btn btn-block form-btn"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "submitting..." : "save changes"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};
export default Profile;
