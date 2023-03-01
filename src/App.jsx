import './App.css'
import HomePageProject from "./Project/HomePageProject"
import router from './router'
import {
  RouterProvider,
} from "react-router-dom";

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}
