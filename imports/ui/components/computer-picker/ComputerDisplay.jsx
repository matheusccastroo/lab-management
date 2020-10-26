import React from "react";
import { LoadingComponent } from "../LoadingComponent";
import { ComputerPersonProfile } from "../ComputerPersonProfile";
import { Modal } from "antd";

export const ComputerDisplay = ({
  showModal,
  setShowModal,
  isLoading,
  computer,
  person,
}) => {
  return (
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
          <ComputerPersonProfile computer={computer} person={person} />
        )}
      </div>
    </Modal>
  );
};
