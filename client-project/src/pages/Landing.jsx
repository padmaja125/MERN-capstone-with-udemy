import Wrapper from "../assets/wrappers/LandingPage";
import main from "../assets/images/jp_main.svg";
import { Link } from "react-router-dom";
import { Logo } from "../components";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info"></div>
        <h1>
          Job <span> tracking</span> app
        </h1>
        <p>
          JobTrackApp is a comprehensive job tracking application designed to
          streamline and organize your job search process. Whether you're a
          seasoned professional looking for a career change or a recent graduate
          entering the job market, JobTrackApp provides all the tools you need
          to manage your job search efficiently.
        </p>
        <Link to="/register" className="btn register-link">
          Register
        </Link>
        <Link to="/login" className="btn">
          Login
        </Link>
      </div>
      <img src={main} alt="job hunt" className="img main-img" />
    </Wrapper>
  );
};

export default Landing;
