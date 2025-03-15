import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux"; // ✅ Import Redux Provider
import App from "./App";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    {" "}
    {/* ✅ Wrap App with Provider */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
