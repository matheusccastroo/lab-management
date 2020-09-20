import React from "react";
import { PersonsCollection } from "../../api/db/persons-collection";
import withTemplate from "../template/WithTemplate";
import { useTracker } from "meteor/react-meteor-data";
import { GenericTable } from "./GenericTable";
import { Button } from "antd";
import { Link } from "@reach/router";
import moment from "moment";

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

const personsTable = () => {
  const { isLoading, persons } = useTracker(() => {
    const handler = Meteor.subscribe("persons.fetchAll");
    return {
      isLoading: !handler.ready(),
      persons: PersonsCollection.find().fetch(),
    };
  });

  return (
    <GenericTable
      dataSource={persons}
      columns={columns}
      isLoading={isLoading}
    />
  );
};

export const AllPersonsView = withTemplate(personsTable, {
  title: "Persons",
  subTitle: "All person can be found here.",
  extra: [
    <Button key="3" type="primary">
      <Link to={`/new-person`}>+ Person</Link>
    </Button>,
  ],
});
