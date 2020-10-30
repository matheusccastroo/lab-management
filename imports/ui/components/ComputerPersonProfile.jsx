import React from "react";
import { Badge, Descriptions } from "antd";
import { ComputerStatus } from "../../api/models/enums";

export const ComputerPersonProfile = ({ computer, person }) => {
  const { location, status: statusNumber, lastBookedAt } = computer;

  if (person) {
    const { name, photoUrl } = person;

    return (
      <Descriptions bordered size="small" column={1}>
        <Descriptions.Item label="Location">{location}</Descriptions.Item>
        <Descriptions.Item label="Status">
          {" "}
          <Badge
            status="processing"
            text={ComputerStatus.getIdentifier(statusNumber)}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Booked at">
          {lastBookedAt?.toString()}
        </Descriptions.Item>
        <Descriptions.Item label="Person Name">{name}</Descriptions.Item>
        <Descriptions.Item label="Person Photo">{photoUrl}</Descriptions.Item>
      </Descriptions>
    );
  }

  return (
    <Descriptions bordered size="small" column={1}>
      <Descriptions.Item label="Location">{location}</Descriptions.Item>
      <Descriptions.Item label="Status">
        {" "}
        <Badge
          status="processing"
          text={ComputerStatus.getIdentifier(statusNumber)}
        />
      </Descriptions.Item>
      {lastBookedAt && (
        <Descriptions.Item label="Booked at">
          {lastBookedAt.toString()}
        </Descriptions.Item>
      )}
    </Descriptions>
  );
};
