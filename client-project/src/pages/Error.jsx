import { Link, useRouteError } from "react-router-dom";
import Wrapper from "../assets/wrappers/ErrorPage";
import img from "../assets/images/page_not_found.svg";

const Error = () => {
  const error = useRouteError;
  console.log(error);
  if (error.status === 404) {
    return (
      <Wrapper>
        <div>
          <img src={img} alt="page not found" />
          <h3>Oops! Can't find now</h3>
          <p>We can't able to find the page which you are looking for</p>
          <Link to="/dashboard"> back home </Link>
        </div>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div>
        <img src={img} alt="page not found" />
        <h3>Something went wrong </h3>
      </div>
    </Wrapper>
  );
};
export default Error;
