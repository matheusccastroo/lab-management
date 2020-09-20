import React, { Fragment } from "react";
import { LoginPage } from "./LoginPage";
import "antd/dist/antd.css";
import { useLoggedInUser } from "../helpers/getLoggedInUser";
import { PageTemplate } from "./template/PageTemplate";

export const App = () => {
  const currentUser = useLoggedInUser();

  if (!currentUser) {
    return <LoginPage />;
  }

  return (
    <Fragment>
      <PageTemplate component={() => <div>Oi</div>} />
    </Fragment>
  );
};
