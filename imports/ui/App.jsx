import React from "react";
import { LoginPage } from "./pages/LoginPage";
import "antd/dist/antd.css";
import { useLoggedInUser } from "../helpers/getLoggedInUser";
import { Router } from "@reach/router";
import { NotFound } from "./pages/NotFound";
import { AllPersonsView } from "./components/PersonsTable";
import { AllComputersView } from "./components/ComputersTable";
import { ConfigProvider } from "antd";
import locale from "antd/es/date-picker/locale/pt_BR";
import { NewPerson } from "./components/NewPersonForm";
import { ComputerPicker } from "./components/computer-picker/ComputerPicker";

export const App = () => {
  const currentUser = useLoggedInUser();

  if (!currentUser) {
    return <LoginPage />;
  }

  return (
    <ConfigProvider locale={locale}>
      <Router>
        <ComputerPicker path="/" />
        <AllPersonsView path="persons" />
        <AllComputersView path="computers" />
        <NewPerson path="/new-person/:personId" />
        <NewPerson path="new-person" />
        <NotFound default />
      </Router>
    </ConfigProvider>
  );
};
