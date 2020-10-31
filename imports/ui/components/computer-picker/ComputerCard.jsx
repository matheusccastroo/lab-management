import React, { useState } from "react";
import DesktopOutlined from "@ant-design/icons/lib/icons/DesktopOutlined";
import { Button } from "antd";
import { ComputerDisplay } from "./ComputerDisplay";
import { findPairComputerPerson } from "../../../api/methods/computer/findPairComputerPerson";

export const ComputerCard = ({ _id, isActive, onCardClick }) => {
  return (
    <>
      <Button
        danger={isActive}
        type="primary"
        icon={<DesktopOutlined />}
        onClick={() => onCardClick(_id)}
        size="large"
      />
    </>
  );
};
