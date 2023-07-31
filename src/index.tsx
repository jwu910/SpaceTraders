/* @refresh reload */
import { render } from "solid-js/web";
import App from "./App";
import "./index.css";

import { Router } from "@solidjs/router";

const root = document.getElementById("root");

render(
  () => (
    <Router>
      <App />
    </Router>
  ),
  root!
);
