import React from "react";
import { Col, Row } from "antd";
import withTemplate from "../../template/WithTemplate";
import { useSubscription } from "../../helpers/useSubscription";
import { ComputersCollection } from "../../../api/db/computers-collection";
import { chunk } from "lodash";
import { ComputerCard } from "./ComputerCard";

const AllComputerPicker = () => {
  const { dataFetched } = useSubscription(
    "computers.fetchAll",
    ComputersCollection,
    undefined,
    { _id: 1, active: 1, currentPerson: 1 }
  );
  const chunkSize = 5;
  const computers = chunk(dataFetched, chunkSize);

  return (
    <>
      <Row justify="space-around" align="middle">
        {computers.map((currentValue) => (
          <Col span={12} className="buttonsContainer">
            {currentValue.map(({ _id, active, currentPerson }) => (
              <ComputerCard
                _id={_id}
                active={active}
                currentPerson={currentPerson}
              />
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
