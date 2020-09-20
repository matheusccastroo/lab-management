import React from "react";
import { Spin, Table } from "antd";

const divSpinStyle = {
  padding: "24px",
  minHeight: "360px",
  width: "100%",
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
};

export const GenericTable = ({ isLoading, ...props }) => {
  if (isLoading) {
    return (
      <div style={divSpinStyle}>
        <Spin tip="Loading..." />
      </div>
    );
  }

  return <Table {...props} />;
};
