import React from "react";
import { Badge, Descriptions } from "antd";

export const ComputerPersonProfile = (props) => {
  console.log(props);
  return (
    <>
      <Descriptions bordered size="small" column={2}>
        <Descriptions.Item label="Location">Cloud Database</Descriptions.Item>
        <Descriptions.Item label="Status">
          {" "}
          <Badge status="processing" text="Running" />
        </Descriptions.Item>
        <Descriptions.Item label="Booked at">Cloud Database</Descriptions.Item>
        <Descriptions.Item label="Person Name">
          Cloud Database
        </Descriptions.Item>
      </Descriptions>
    </>
  );
};
