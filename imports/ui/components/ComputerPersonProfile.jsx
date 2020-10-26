import React from "react";
import { Badge, Descriptions } from "antd";

export const ComputerPersonProfile = ({ computer, person }) => {
  const { location, status, bookedAt, currentPerson, active } = computer;

  const { name, photoUrl } = person;

  const bookedComputer = (
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
  );

  const idleComputer = <div>oi</div>;

  return <>{active ? bookedComputer : idleComputer}</>;
};
