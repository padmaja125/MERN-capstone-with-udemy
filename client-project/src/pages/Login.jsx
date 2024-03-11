import {
  Link,
  redirect,
  Form,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo } from "../components";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch.js";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/auth/login", data);
    toast.success("login successful");
    return redirect("/dashboard");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Login = () => {
  const navigation = useNavigation();
  const navigate = useNavigate();

  const loginUserDemo = async () => {
    const data = {
      email: "john@example.com",
      password: "password123",
    };
    try {
      await customFetch.post("/auth/login", data);
      toast.success("navigate to the page");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };
  const isSubmitting = navigation.state === "submitting";

  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Login</h4>

        <FormRow type="email" name="email" defaultValue="john@tester.com" />
        <FormRow type="password" name="password" defaultValue="tester123" />
        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? "submitting..." : "submit"}
        </button>
        <button type="button" className="btn btn-block" onClick={loginUserDemo}>
          explore the app
        </button>
        <p>
          Not a member yet?
          <Link to="/register" className="member-btn">
            register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Login;
