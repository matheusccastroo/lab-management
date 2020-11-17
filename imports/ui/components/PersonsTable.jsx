import React from "react";
import withTemplate from "../template/WithTemplate";
import { GenericTable } from "./generic/GenericTable";
import { Button, Space } from "antd";
import { Link } from "@reach/router";
import moment from "moment";
import { useSubscription } from "../helpers/useSubscription";
import { Person } from "../../api/models/person";
import { personDelete } from "../../api/methods/person/personDelete";

const columns = [
  {
    title: "Nome",
    key: "name",
    render: (person) => person.getFullName(),
  },
  {
    title: "Data de Nascimento",
    dataIndex: "dateOfBirth",
    key: "dateOfBirth",
    render: (value) => moment(value).format("DD/MM/YYYY"),
  },
  {
    title: "Endereço",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Criado em",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (value) => moment(value).format("DD/MM/YYYY - HH:mm"),
  },
  {
    title: "Ações",
    render: (person) => (
      <Space size="middle">
        <Button disabled={person.isUsingComputer}>
          <Link to={`/new-person/${person._id}`} className="nav-text">
            Editar
          </Link>
        </Button>
        <Button
          danger
          onClick={() => {
            const shouldDelete = confirm(
              "Você tem certeza que deseja deletar?"
            );
            if (shouldDelete) personDelete.call({ _id: person._id });
          }}
          disabled={person.isUsingComputer}
        >
          Excluir
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
  title: "Pessoas",
  subTitle: "Todas as pessoas aparecem aqui.",
  extra: [
    <Button key="3" type="primary">
      <Link to={`/new-person`}>+ Pessoa</Link>
    </Button>,
  ],
})(PersonsTable);
