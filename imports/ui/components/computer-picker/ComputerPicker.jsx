import React, { useState } from "react";
import { Col, Modal, Row } from "antd";
import withTemplate from "../../template/WithTemplate";
import { useSubscription } from "../../helpers/useSubscription";
import { ComputersCollection } from "../../../api/db/computers-collection";
import { chunk } from "lodash";
import { ComputerCard } from "./ComputerCard";
import { findPairComputerPerson } from "../../../api/methods/computer/findPairComputerPerson";
import { LoadingComponent } from "../LoadingComponent";
import { ComputerPersonProfile } from "../ComputerPersonProfile";

const AllComputerPicker = ({ columnSpan }) => {
  const [showModal, setShowModal] = useState(false);
  const [lastComputerId, setLastComputerId] = useState(null);
  const [computer, setComputer] = useState(null);
  const [person, setPerson] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { dataFetched } = useSubscription(
    "computers.fetchAll",
    ComputersCollection,
    undefined,
    { _id: 1 }
  );
  const chunkSize = 5;
  const computers = chunk(dataFetched, chunkSize);

  //TODO -> add a divider.

  const handleComputerCardOnClick = ({ _id, personId }) => {
    if (_id === lastComputerId) {
      setShowModal(true);
      return;
    }
    setIsLoading(true);
    setShowModal(true);
    findPairComputerPerson.call(
      { computerId: _id, personId },
      (err, response) => {
        if (err) {
          console.log(err);
          return;
        }
        setLastComputerId(_id);
        const { computer, person } = response;
        setComputer(computer);
        setPerson(person);
        setIsLoading(false);
      }
    );
  };

  const modal = (
    <Modal
      title="Information"
      visible={showModal}
      onOk={() => setShowModal(false)}
      onCancel={() => setShowModal(false)}
    >
      <div>
        {isLoading ? (
          <LoadingComponent />
        ) : (
          <ComputerPersonProfile computer={computer} />
        )}
      </div>
    </Modal>
  );

  return (
    <>
      <Row justify="space-around" align="middle">
        {computers.map((currentValue) => (
          <Col span={12} className="buttonsContainer">
            {currentValue.map((value) => (
              <ComputerCard onClick={() => handleComputerCardOnClick(value)} />
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
