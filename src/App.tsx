import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Page from "./components/page/Page";
import { HomePage, ErrorPage, ExperiencePage, AppsPage } from "./routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Page children={<HomePage />} />,
    errorElement:<Page children={<ErrorPage />} />,
  },
  {
    path: "/experience",
    element: <Page children={<ExperiencePage />} />,
    errorElement:<Page children={<ErrorPage />} />,
  },
  {
    path: "/apps",
    element: <Page children={<AppsPage />} />,
    errorElement: <Page children={<ErrorPage />} />,
  },
]);



function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
