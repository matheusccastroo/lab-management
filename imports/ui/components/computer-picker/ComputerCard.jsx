import React, { useState } from "react";
import DesktopOutlined from "@ant-design/icons/lib/icons/DesktopOutlined";
import { Button, Modal } from "antd";

export const ComputerCard = ({ id, active, ...props }) => {
  return (
    <>
      <Button
        danger={active}
        type="primary"
        icon={<DesktopOutlined />}
        size="large"
        {...props}
      />
    </>
  );
};
