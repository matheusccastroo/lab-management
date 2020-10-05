import React, { useState } from "react";
import { Col, Modal, Row } from "antd";
import withTemplate from "../../template/WithTemplate";
import { useSubscription } from "../../helpers/useSubscription";
import { ComputersCollection } from "../../../api/db/computers-collection";
import { chunk } from "lodash";
import { ComputerCard } from "./ComputerCard";

const AllComputerPicker = ({ columnSpan }) => {
  const [showModal, setShowModal] = useState(false);
  const { dataFetched } = useSubscription(
    "computers.fetchAll",
    ComputersCollection,
    undefined,
    { _id: 1 }
  );
  const chunkSize = dataFetched && Math.ceil(dataFetched.length / 2);
  const computers = chunk(dataFetched, chunkSize);

  //TODO -> chunks of 8 or so, add a divider.

  const modal = () => {
    return (
      <Modal
        title="Information"
        visible={showModal}
        onOk={() => setShowModal(false)}
        onCancel={() => setShowModal(false)}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    );
  };

  return (
    <>
      <Row justify="space-around" align="middle">
        {computers.map((currentValue) => (
          <Col span={12} className="buttonsContainer">
            {currentValue.map((value) => (
              <ComputerCard onClick={() => setShowModal(!showModal)} />
            ))}
          </Col>
        ))}
      </Row>
      {modal}
    </>
  );
};

export const ComputerPicker = withTemplate({
  withHeader: true,
  title: "Home",
  subTitle: "You can book computers here.",
})(AllComputerPicker);
