import {
  Outlet,
  redirect,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import Wrapper from "../assets/wrappers/Dashboard";
import { BigSidebar, SmallSidebar, Navbar, Loading } from "../components";
import { createContext, useContext, useState } from "react";
import { checkDefaultTheme } from "../App";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
//create global context to send props to the child components

const DashboardContext = createContext();
//get data from the db
export const loader = async () => {
  try {
    const { data } = await customFetch.get("/user/current-user");
    return data;
  } catch (error) {
    console.log(error);
    redirect("/");
  }
};

const DashboardLayout = () => {
  //temp variables or placeholders
  const { user } = useLoaderData();
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme);
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  // arrow function to toggle btwn dark and white
  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle("dark-theme", newDarkTheme);
    localStorage.setItem("darkTheme", newDarkTheme);
  };

  //arrow function to toggle small and big sidebar
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  //arrow function to show username or not
  const logoutUser = async () => {
    navigate("/");
    await customFetch.post("/auth/logout");
    console.log("logout User");
    toast.success("logging out....");
  };

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <BigSidebar />
          <SmallSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              {isLoading ? <Loading /> : <Outlet context={{ user }} />}
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

//export the custom hook
// eslint-disable-next-line react-refresh/only-export-components
export const useDashboardContext = () => {
  return useContext(DashboardContext);
};

export default DashboardLayout;
