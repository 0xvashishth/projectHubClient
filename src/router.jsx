import {
    createBrowserRouter,
  } from "react-router-dom";
  
import HomePageProject from "./Project/HomePageProject";
import AllProjects from "./Project/AllProjects"
  
  const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePageProject/>,
    },
    {
      path: "/projects",
      element: <AllProjects/>,
    }
  ]);
  
  
  export default router;