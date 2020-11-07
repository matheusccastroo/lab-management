import React from "react";
import withTemplate from "../template/WithTemplate";
import { GenericTable } from "./generic/GenericTable";
import { Button, Space } from "antd";
import { Link } from "@reach/router";
import moment from "moment";
import { useSubscription } from "../helpers/useSubscription";
import { Computer } from "../../api/models/computer";
import { computerDelete } from "../../api/methods/computer/computerDelete";

const columns = [
  {
    title: "Location",
    dataIndex: "location",
    key: "location",
  },
  {
    title: "Status",
    key: "status",
    render: (computer) => computer.getStatusDecoded(),
  },
  {
    title: "Updated at",
    dataIndex: "updatedAt",
    key: "updatedAt",
    render: (value) => moment(value).format("DD/MM/YYYY - HH:mm"),
  },
  {
    title: "Created at",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (value) => moment(value).format("DD/MM/YYYY - HH:mm"),
  },
  {
    title: "Actions",
    render: (computer) => (
      <Space size="middle">
        <Button disabled={computer.isActive()}>
          <Link to={`/new-computer/${computer._id}`} className="nav-text">
            Edit
          </Link>
        </Button>
        <Button
          danger
          onClick={() => {
            const shouldDelete = confirm("Are you sure you want to delete?");
            if (shouldDelete) computerDelete.call({ _id: computer._id });
          }}
          disabled={computer.isActive()}
        >
          Delete
        </Button>
      </Space>
    ),
  },
];

const ComputersTable = () => {
  const { dataFetched } = useSubscription("computers.fetchAll", Computer);

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
