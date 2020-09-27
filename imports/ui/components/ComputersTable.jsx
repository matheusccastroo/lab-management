import React from "react";
import withTemplate from "../template/WithTemplate";
import { GenericTable } from "./generic/GenericTable";
import { Button } from "antd";
import { Link } from "@reach/router";
import moment from "moment";
import { useSubscription } from "../helpers/useSubscription";
import { ComputersCollection } from "../../api/db/computers-collection";

const columns = [
  {
    title: "Number",
    dataIndex: "number",
    key: "number",
  },
  {
    title: "In Use",
    dataIndex: "inUse",
    key: "inUse",
  },
  {
    title: "Location",
    dataIndex: "Location",
    key: "location",
  },
  {
    title: "Updated at",
    dataIndex: "updatedAt",
    key: "updatedAt",
    render: (value) => moment(value).format("DD/MM/YYYY - HH:mm"),
  },
  {
    title: "Actions",
  },
];

const ComputersTable = () => {
  const { dataFetched } = useSubscription(
    "computers.fetchAll",
    ComputersCollection
  );

  return <GenericTable dataSource={dataFetched} columns={columns} />;
};

export const AllComputersView = withTemplate({
  withHeader: true,
  title: "Computers",
  subTitle: "All computers can be found here.",
  extra: [
    <Button key="3" type="primary">
      <Link to={`/new-computer`}>+ Computer</Link>
    </Button>,
  ],
})(ComputersTable);
