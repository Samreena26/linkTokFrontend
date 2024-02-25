import React from "react";

import "./index.css";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Registration from "./components/Registration.jsx";
import Login from "./components/Login.jsx";
import Home from "./components/Home.jsx";
import ChangePassword from "./components/ChangePassword";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/Registration",
		element: <Registration />,
	},
	{
		path: "/reset",
		element: <ChangePassword />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
