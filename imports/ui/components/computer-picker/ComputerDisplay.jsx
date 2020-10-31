import React from "react";
import { LoadingComponent } from "../LoadingComponent";
import {
  AutoComplete,
  Badge,
  Button,
  Descriptions,
  Form,
  Input,
  Modal,
} from "antd";
import { ComputerStatus } from "../../../api/models/enums";

const ModalContent = ({ computer, person, formRef }) => {
  const { location, status: statusNumber, lastBookedAt } = computer;

  const bookForm = (
    <Form
      form={formRef}
      name="basic"
      onFinish={(values) => console.log(values)}
    >
      <Form.Item
        label="Person"
        name="currentPersonId"
        rules={[{ required: true, message: "Title is required!" }]}
      >
        <AutoComplete
          options={options}
          style={{ width: 200 }}
          onSelect={onSelect}
          onSearch={onSearch}
          placeholder="input here"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );

  if (person) {
    const { name, photoUrl } = person;

    return (
      <Descriptions bordered size="small" column={1}>
        <Descriptions.Item label="Location">{location}</Descriptions.Item>
        <Descriptions.Item label="Status">
          {" "}
          <Badge
            status="processing"
            text={ComputerStatus.getIdentifier(statusNumber)}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Booked at">
          {lastBookedAt?.toString()}
        </Descriptions.Item>
        <Descriptions.Item label="Person Name">{name}</Descriptions.Item>
        <Descriptions.Item label="Person Photo">{photoUrl}</Descriptions.Item>
      </Descriptions>
    );
  }

  return (
    <>
      <Descriptions bordered size="small" column={1}>
        <Descriptions.Item label="Location">{location}</Descriptions.Item>
        <Descriptions.Item label="Status">
          {" "}
          <Badge
            status="success"
            text={ComputerStatus.getIdentifier(statusNumber)}
          />
        </Descriptions.Item>
        {lastBookedAt && (
          <Descriptions.Item label="Booked at">
            {lastBookedAt.toString()}
          </Descriptions.Item>
        )}
      </Descriptions>
      {bookForm}
    </>
  );
};
export const ComputerDisplay = ({
  showModal,
  setShowModal,
  isLoading,
  computer,
  person,
}) => {
  if (isLoading) return <LoadingComponent />;

  let content;

  content = <ModalContent computer={computer} person={person} />;

  if (!person) {
    const [form] = Form.useForm();

    content = (
      <ModalContent computer={computer} person={person} formRef={form} />
    );
  }

  return (
    <Modal
      title="Information"
      visible={showModal}
      onOk={() => setShowModal(false)}
      onCancel={() => setShowModal(false)}
    >
      <div>{content}</div>
    </Modal>
  );
};
