import React from "react";
import { PersonsCollection } from "../../api/db/persons-collection";
import withTemplate from "../template/WithTemplate";
import { GenericTable } from "./generic/GenericTable";
import { Button, Space } from "antd";
import { Link } from "@reach/router";
import moment from "moment";
import { useSubscription } from "../helpers/useSubscription";
import { Person } from "../../api/models/person";
import { computerDelete } from "../../api/methods/computer/computerDelete";
import { personDelete } from "../../api/methods/person/personDelete";

const columns = [
  {
    title: "Name",
    key: "name",
    render: (person) => person.getFullName(),
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Created at",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (value) => moment(value).format("DD/MM/YYYY - HH:mm"),
  },
  {
    title: "Actions",
    render: ({ _id }) => (
      <Space size="middle">
        <Button>
          <Link to={`/new-person/${_id}`} className="nav-text">
            Edit
          </Link>
        </Button>
        <Button
          danger
          onClick={() => {
            const shouldDelete = confirm("Are you sure you want to delete?");
            if (shouldDelete) personDelete.call({ _id });
          }}
        >
          Delete
        </Button>
      </Space>
    ),
  },
];

const PersonsTable = () => {
  const { dataFetched } = useSubscription("persons.fetchAll", Person);

  return <GenericTable dataSource={dataFetched} columns={columns} />;
};

export const AllPersonsView = withTemplate({
  withHeader: true,
  title: "Persons",
  subTitle: "All person can be found here.",
  extra: [
    <Button key="3" type="primary">
      <Link to={`/new-person`}>+ Person</Link>
    </Button>,
  ],
})(PersonsTable);
