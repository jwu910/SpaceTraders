import { Route, Routes } from "@solidjs/router";
import "./App.css";
import HomePage from "./pages/HomePage";

export default function App() {
  return (
    <Routes base="/spacetraders/">
      <Route path="/" component={HomePage} />
    </Routes>
  );
}
