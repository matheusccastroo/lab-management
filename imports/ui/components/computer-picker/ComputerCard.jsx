import React, { useState } from "react";
import DesktopOutlined from "@ant-design/icons/lib/icons/DesktopOutlined";
import { Button } from "antd";
import { ComputerDisplay } from "./ComputerDisplay";
import { findPairComputerPerson } from "../../../api/methods/computer/findPairComputerPerson";

export const ComputerCard = ({ _id, currentPersonId }) => {
  const [showModal, setShowModal] = useState(false);
  const [lastComputerId, setLastComputerId] = useState(null);
  const [computer, setComputer] = useState(null);
  const [person, setPerson] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleComputerCardOnClick = (_id, personId) => {
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

  const isActive = computer?.isActive();

  return (
    <>
      <Button
        danger={isActive}
        type="primary"
        icon={<DesktopOutlined />}
        onClick={() => handleComputerCardOnClick(_id, currentPersonId)}
        size="large"
      />
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
