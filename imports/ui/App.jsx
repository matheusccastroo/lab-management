import React from "react";
import { LoginPage } from "./pages/LoginPage";
import "antd/dist/antd.css";
import { useLoggedInUser } from "../helpers/getLoggedInUser";
import { Router } from "@reach/router";
import { NotFound } from "./pages/NotFound";
import { AllPersonsView } from "./components/PersonsTable";

export const App = () => {
  const currentUser = useLoggedInUser();

  if (!currentUser) {
    return <LoginPage />;
  }

  return (
    <Router>
      <AllPersonsView path="/persons" />
      <NotFound default />
    </Router>
  );
};
