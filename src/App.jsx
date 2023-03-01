import './App.css'
import Nav from "./Nav/Nav"
import HomePageProject from "./Project/HomePageProject"
import router from './router'
import {
  RouterProvider,
} from "react-router-dom";

export default function App() {
  return (
    <>
      <Nav />
      <RouterProvider router={router} />
    </>
  )
}
