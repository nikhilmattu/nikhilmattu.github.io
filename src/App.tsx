import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Page from "./components/page/Page";
import { Home, ErrorPage, ExperienceTimeline } from "./routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Page children={<Home />} />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/experience",
    element: <Page children={<ExperienceTimeline />} />,
    errorElement: <ErrorPage />,
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
