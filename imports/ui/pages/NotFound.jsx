import React from "react";
import { Button, Result } from "antd";
import { navigate } from "@reach/router";

export const NotFound = () => {
  const onButtonClick = () => navigate("/");
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={onButtonClick}>
          Back Home
        </Button>
      }
    />
  );
};
