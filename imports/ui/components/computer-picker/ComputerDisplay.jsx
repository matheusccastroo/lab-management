import React, { useState } from "react";
import { LoadingComponent } from "../LoadingComponent";
import { Badge, Descriptions, Form, Modal, Select } from "antd";
import { ComputerStatus } from "../../../api/models/enums";
import { getPersonsIdAndFullName } from "../../../api/methods/person/getPersonsIdAndFullName";
import { computerUpsert } from "../../../api/methods/computer/computerUpsert";

const { Option } = Select;

const BookForm = ({ computer, formRef }) => {
  const { location, status: statusNumber, lastBookedAt } = computer;
  const [personsOptions, setPersonsOptions] = useState(undefined);

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
        <Descriptions.Item label="Person">
          <Form form={formRef} name="bookComputerForm">
            <Form.Item
              name="currentPersonId"
              style={{ marginBottom: "0px" }}
              rules={[{ required: true, message: "Please select a person!" }]}
            >
              <Select
                showSearch
                placeholder="Select a person..."
                optionFilterProp="children"
                onSearch={(name) => {
                  getPersonsIdAndFullName.call({ name }, (err, response) => {
                    if (err) {
                      console.log(err);
                      return;
                    }

                    setPersonsOptions(response);
                  });
                }}
              >
                {personsOptions &&
                  personsOptions.map(({ value, label }) => (
                    <Option value={value}>{label}</Option>
                  ))}
              </Select>
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
      <Descriptions.Item label="Person Name">
        {person.getFullName()}
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

  const getContent = () => {
    if (isActive && person) {
      return <ActiveComputerProfile person={person} computer={computer} />;
    }
    return <BookForm computer={computer} formRef={form} />;
  };

  const isActive = computer && computer.isActive();

  return (
    <Modal
      title="Information"
      visible={showModal}
      onOk={() => {
        if (!isActive) {
          form
            .validateFields()
            .then(({ currentPersonId }) => {
              computer.setActive(currentPersonId);
              computer.lastBookedAt = new Date();
              computerUpsert.call(computer, (err) => {
                if (err) {
                  console.log(err);
                }
              });
              setShowModal(false);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        } else {
          computer.status = ComputerStatus.IDLE;
          computer.currentPersonId = null;
          computerUpsert.call(computer, (err) => {
            if (err) {
              console.log(err);
            }
          });
          setShowModal(false);
        }
      }}
      onCancel={() => setShowModal(false)}
      okText={isActive ? "Unbook" : "Book"}
    >
      <div>{isLoading ? <LoadingComponent /> : getContent(person)}</div>
    </Modal>
  );
};
