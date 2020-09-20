import React from "react";
import { LoginPage } from "./LoginPage";
import "antd/dist/antd.css";
import { useLoggedInUser } from "../helpers/getLoggedInUser";

export const App = () => {
  const currentUser = useLoggedInUser();

  if (!currentUser) {
    return <LoginPage />;
  }

  return <div>Logado</div>;
};
