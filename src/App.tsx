import Login from "./Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Register from "./Register";
import ProtectedData from "./ProtectedData";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/jobs",
    element: <ProtectedData />,
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
