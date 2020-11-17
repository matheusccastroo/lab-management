import React from "react";
import { Spin } from "antd";

const divSpinStyle = {
  padding: "24px",
  minHeight: "360px",
  width: "100%",
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
};

export const LoadingComponent = ({ tip = "Carregando...", ...props }) => {
  return (
    <div style={divSpinStyle}>
      <Spin tip={tip} {...props} />
    </div>
  );
};
