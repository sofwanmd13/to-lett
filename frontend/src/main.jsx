import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Component/Router/Router";
import AuthProvider from "./Provider/AuthProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
