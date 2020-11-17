import React, { useState } from "react";
import { LoadingComponent } from "../LoadingComponent";
import { Badge, Button, Descriptions, Form, Modal, Select } from "antd";
import { ComputerStatus } from "../../../api/models/enums";
import { getPersonsIdAndFullName } from "../../../api/methods/person/getPersonsIdAndFullName";
import { bookUnbookComputer } from "../../../api/methods/computer/bookUnbookComputer";

const BookForm = ({ computer, formRef }) => {
  const { location, status: statusNumber, lastBookedAt } = computer;
  const [personsOptions, setPersonsOptions] = useState(undefined);

  return (
    <>
      <Descriptions bordered size="small" column={1}>
        <Descriptions.Item label="Localização">{location}</Descriptions.Item>
        <Descriptions.Item label="Estado">
          {" "}
          <Badge
            status="success"
            text={ComputerStatus.getIdentifier(statusNumber)}
          />
        </Descriptions.Item>
        {lastBookedAt && (
          <Descriptions.Item label="Ultima locação em">
            {lastBookedAt.toString()}
          </Descriptions.Item>
        )}
        <Descriptions.Item label="Pessoa">
          <Form form={formRef} name="bookComputerForm">
            <Form.Item
              name="currentPersonId"
              style={{ marginBottom: "0px" }}
              rules={[
                { required: true, message: "Por favor, selecione uma pessoa!" },
              ]}
            >
              <Select
                showSearch
                defaultValue={undefined}
                placeholder="Selecione uma pessoa..."
                optionFilterProp="label"
                onSearch={(name) => {
                  getPersonsIdAndFullName.call({ name }, (err, response) => {
                    if (err) {
                      console.log(err);
                      return;
                    }

                    setPersonsOptions(response);
                  });
                }}
                options={personsOptions}
              />
            </Form.Item>
          </Form>
        </Descriptions.Item>
      </Descriptions>
    </>
  );
};

const ActiveComputerProfile = ({ computer, person }) => {
  const { location, status: statusNumber, lastBookedAt } = computer;

  return (
    <Descriptions bordered size="small" column={1}>
      <Descriptions.Item label="Localização">{location}</Descriptions.Item>
      <Descriptions.Item label="Estado">
        {" "}
        <Badge
          status="processing"
          text={ComputerStatus.getIdentifier(statusNumber)}
        />
      </Descriptions.Item>
      <Descriptions.Item label="Locado em">
        {lastBookedAt?.toString()}
      </Descriptions.Item>
      <Descriptions.Item label="Nome da Pessoa">
        {person.getFullName()}
      </Descriptions.Item>
      <Descriptions.Item label="Página atual">
        {computer.getActualHistoryFormated()}
      </Descriptions.Item>
    </Descriptions>
  );
};

export const ComputerDisplay = ({
  showModal,
  setShowModal,
  isLoading,
  computer,
  person,
}) => {
  const [form] = Form.useForm();
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const getContent = () => {
    if (isActive && person) {
      return <ActiveComputerProfile person={person} computer={computer} />;
    }
    return <BookForm computer={computer} formRef={form} />;
  };

  const isActive = computer && computer.isActive();

  const handleSubmit = () => {
    if (!isActive) {
      setIsButtonLoading(true);
      form
        .validateFields()
        .then(({ currentPersonId }) => {
          bookUnbookComputer.call(
            { computerObject: computer, personId: currentPersonId },
            (err) => {
              if (err) {
                console.log(err);
              }
            }
          );
          setIsButtonLoading(false);
          setShowModal(false);
        })
        .catch((info) => {
          console.log("Validate Failed:", info);
        })
        .then(() => form.resetFields());
    } else {
      bookUnbookComputer.call({ computerObject: computer, person }, (err) => {
        if (err) {
          console.log(err);
        }
      });
      setShowModal(false);
    }
  };

  const handelCancel = () => setShowModal(false);

  return (
    <Modal
      title="Informações"
      visible={showModal}
      onCancel={handelCancel}
      footer={[
        <Button key="back" onClick={handelCancel}>
          Return
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={isButtonLoading}
          onClick={handleSubmit}
          disabled={isActive && !person}
        >
          {isActive ? "Liberar" : "Locar"}
        </Button>,
      ]}
    >
      <div>{isLoading ? <LoadingComponent /> : getContent(person)}</div>
    </Modal>
  );
};
