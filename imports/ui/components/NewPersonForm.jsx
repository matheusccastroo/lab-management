import React, { useEffect, useRef } from "react";
import { Button, DatePicker, Form, Input } from "antd";
import { useSubscription } from "../helpers/useSubscription";
import { PersonsCollection } from "../../api/db/persons-collection";
import { personUpsert } from "../../api/methods/person/personUpsert";
import { navigate, useParams } from "@reach/router";
import withTemplate from "../template/WithTemplate";
import moment from "moment";

const layout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 24 },
};
const tailLayout = {
  wrapperCol: { offset: 12, span: 0 },
};

const NewPersonForm = () => {
  const { personId: _id } = useParams();
  const [form] = Form.useForm();

  const { dataFetched: existingEntry } = useSubscription(
    "persons.fetchAll",
    PersonsCollection,
    { _id }
  );

  const initialValues = existingEntry
    ? {
        ...existingEntry[0],
        dateOfBirth: moment(existingEntry[0].dateOfBirth),
      }
    : {};

  useEffect(() => form.resetFields(), [initialValues]);

  const onFinish = (values) => {
    const { dateOfBirth } = values;
    personUpsert.call({
      ...values,
      dateOfBirth: dateOfBirth?.toDate(),
      _id,
    });
    navigate("/persons", { replace: true });
  };

  return (
    <Form
      {...layout}
      form={form}
      name="basic"
      initialValues={initialValues}
      onFinish={onFinish}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Title is required!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Date of Birth"
        name="dateOfBirth"
        rules={[{ required: true, message: "Date of birth is required!" }]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        label="Address"
        name="address"
        rules={[{ required: true, message: "Address is required!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export const NewPerson = withTemplate({ withHeader: false })(NewPersonForm);
