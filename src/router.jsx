import {
    createBrowserRouter,
  } from "react-router-dom";
  
import HomePageProject from "./Project/HomePageProject";
import AllProjects from "./Project/AllProjects"
import ProjectDetail from "./Project/ProjectDetail";
import ErrorPage from "./Error/ErrorPage";
  
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
      errorElement: <ErrorPage />
    }
  ]);
  
  
  export default router;