import React, { useState } from "react";
import { Col, Row } from "antd";
import withTemplate from "../../template/WithTemplate";
import { useSubscription } from "../../helpers/useSubscription";
import { chunk } from "lodash";
import { ComputerCard } from "./ComputerCard";
import { Computer } from "../../../api/models/computer";
import { ComputerStatus } from "../../../api/models/enums";
import { ComputerDisplay } from "./ComputerDisplay";
import { findPairComputerPerson } from "../../../api/methods/computer/findPairComputerPerson";

const AllComputerPicker = () => {
  const [showModal, setShowModal] = useState(false);
  const [computer, setComputer] = useState(null);
  const [person, setPerson] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastComputerId, setLastComputerId] = useState(undefined);

  const { dataFetched } = useSubscription(
    "computers.fetchAll",
    Computer,
    undefined,
    { _id: 1, status: 1 }
  );
  const chunkSize = 5;
  const computers = chunk(dataFetched, chunkSize);

  const handleComputerCardOnClick = (_id) => {
    setIsLoading(true);
    setShowModal(true);
    findPairComputerPerson.call({ computerId: _id }, (err, response) => {
      if (err) {
        console.log(err);
        return;
      }
      const { computer, person } = response;
      setLastComputerId(_id);
      setComputer(computer);
      setPerson(person);
      setIsLoading(false);
    });
  };

  return (
    <>
      <Row justify="space-around" align="middle">
        {computers.map((currentValue) => (
          <Col span={12} className="buttonsContainer">
            {currentValue.map(({ _id, status }) => (
              <ComputerCard
                _id={_id}
                isActive={status === ComputerStatus.RUNNING}
                onCardClick={handleComputerCardOnClick}
              />
            ))}
          </Col>
        ))}
      </Row>
      <ComputerDisplay
        computer={computer}
        person={person}
        isLoading={isLoading}
        setShowModal={setShowModal}
        showModal={showModal}
      />
    </>
  );
};

export const ComputerPicker = withTemplate({
  withHeader: true,
  title: "Home",
  subTitle: "Você pode locar os computadores aqui.",
})(AllComputerPicker);
