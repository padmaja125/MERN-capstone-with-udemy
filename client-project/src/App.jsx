import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  HomeLayout,
  Landing,
  Login,
  DashboardLayout,
  Error,
  Register,
  AllJobs,
  EditJob,
  Stats,
  DeleteJob,
  AddJob,
  Admin,
  Profile,
} from "./pages";
//action
import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { action as profileAction } from "./pages/Profile";
import { action as addJobAction } from "./pages/AddJob";
import { action as deleteJobAction } from "./pages/DeleteJob";
import {
  loader as editJobLoader,
  action as editJobAction,
} from "./pages/EditJob";
//loader
import { loader as dashboardLoader } from "./pages/DashboardLayout";
import { loader as allJobsLoader } from "./pages/AllJobs";
import { loader as adminLoader } from "./pages/Admin";
import { loader as statsLoader } from "./pages/Stats";

export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};
checkDefaultTheme();

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "register",
        element: <Register />,
        action: registerAction,
      },
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        loader: dashboardLoader,
        children: [
          {
            path: "admin",
            element: <Admin />,
            loader: adminLoader,
          },
          {
            path: "stats",
            element: <Stats />,
            loader: statsLoader,
          },
          {
            index: true,
            path: "All-Jobs",
            element: <AllJobs />,
            loader: allJobsLoader,
          },
          {
            path: "profile",
            element: <Profile />,
            action: profileAction,
          },
          {
            path: "Add-Job",
            element: <AddJob />,
            action: addJobAction,
          },
          {
            path: "edit-job/:id",
            element: <EditJob />,
            action: editJobAction,
            loader: editJobLoader,
          },
          {
            path: "delete-job/:id",
            element: <DeleteJob />,
            action: deleteJobAction,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};
export default App;
