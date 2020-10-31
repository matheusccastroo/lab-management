import React from "react";
import { Col, Row } from "antd";
import withTemplate from "../../template/WithTemplate";
import { useSubscription } from "../../helpers/useSubscription";
import { chunk } from "lodash";
import { ComputerCard } from "./ComputerCard";
import { Computer } from "../../../api/models/computer";

const AllComputerPicker = () => {
  const { dataFetched } = useSubscription(
    "computers.fetchAll",
    Computer,
    undefined,
    { _id: 1, currentPersonId: 1 }
  );
  const chunkSize = 5;
  const computers = chunk(dataFetched, chunkSize);

  return (
    <>
      <Row justify="space-around" align="middle">
        {computers.map((currentValue) => (
          <Col span={12} className="buttonsContainer">
            {currentValue.map(({ _id, currentPersonId }) => (
              <ComputerCard _id={_id} currentPerson={currentPersonId} />
            ))}
          </Col>
        ))}
      </Row>
    </>
  );
};

export const ComputerPicker = withTemplate({
  withHeader: true,
  title: "Home",
  subTitle: "You can book computers here.",
})(AllComputerPicker);
