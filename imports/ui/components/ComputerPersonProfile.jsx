import React from "react";
import { Badge, Descriptions } from "antd";

export const ComputerPersonProfile = (computer) => {
  const { location, status, bookedAt, currentPerson } = computer.computer;
  const { name, photoUrl } = currentPerson;

  return (
    <>
      <Descriptions bordered size="small" column={1}>
        <Descriptions.Item label="Location">{location}</Descriptions.Item>
        <Descriptions.Item label="Status">
          {" "}
          <Badge status="processing" text={status} />
        </Descriptions.Item>
        <Descriptions.Item label="Booked at">
          {bookedAt.toString()}
        </Descriptions.Item>
        <Descriptions.Item label="Person Name">{name}</Descriptions.Item>
        <Descriptions.Item label="Person Photo">{photoUrl}</Descriptions.Item>
      </Descriptions>
    </>
  );
};
