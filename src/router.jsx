import {
    createBrowserRouter,
  } from "react-router-dom";
  
import HomePageProject from "./Project/HomePageProject";
import AllProjects from "./Project/AllProjects"
import ProjectDetail from "./Project/ProjectDetail";
import ErrorPage from "./Error/ErrorPage";
import TopUsers from "./User/TopUsers"
import LoginScreen from "./Auth/Login";
import SignupScreen from "./Auth/Signup"
  
  const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePageProject/>,
    },
    {
      path: "/projects",
      element: <AllProjects/>,
    },
    {
      path: "/project/:id",
      element: <ProjectDetail/>,
    },
    {
      path: "/users",
      element: <TopUsers/>
    },
    {
      path: "/login",
      element: <LoginScreen/>
    },
    {
      path: "/signup",
      element: <SignupScreen/>
    },
    {
      errorElement: <ErrorPage />
    }
  ]);
  
  
  export default router;