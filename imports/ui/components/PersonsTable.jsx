import React from "react";
import { PersonsCollection } from "../../api/db/persons-collection";
import withTemplate from "../template/WithTemplate";
import { GenericTable } from "./GenericTable";
import { Button } from "antd";
import { Link } from "@reach/router";
import moment from "moment";
import { useSubscription } from "../helpers/useSubscription";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
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
  },
];

const PersonsTable = () => {
  const { dataFetched } = useSubscription(
    "persons.fetchAll",
    PersonsCollection
  );

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
