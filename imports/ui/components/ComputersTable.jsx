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
    title: "Localização",
    dataIndex: "location",
    key: "location",
  },
  {
    title: "Estado",
    key: "status",
    render: (computer) => computer.getStatusDecoded(),
  },
  {
    title: "Atualizado em",
    dataIndex: "updatedAt",
    key: "updatedAt",
    render: (value) => moment(value).format("DD/MM/YYYY - HH:mm"),
  },
  {
    title: "Criado em",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (value) => moment(value).format("DD/MM/YYYY - HH:mm"),
  },
  {
    title: "Ações",
    render: (computer) => (
      <Space size="middle">
        <Button disabled={computer.isActive()}>
          <Link to={`/new-computer/${computer._id}`} className="nav-text">
            Editar
          </Link>
        </Button>
        <Button
          danger
          onClick={() => {
            const shouldDelete = confirm(
              "Você tem certeza que deseja deletar?"
            );
            if (shouldDelete) computerDelete.call({ _id: computer._id });
          }}
          disabled={computer.isActive()}
        >
          Excluir
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
  title: "Computadores",
  subTitle: "Todos os computadores aparecem aqui.",
  extra: [
    <Button key="3" type="primary">
      <Link to={`/new-computer`}>+ Computador</Link>
    </Button>,
  ],
})(ComputersTable);
