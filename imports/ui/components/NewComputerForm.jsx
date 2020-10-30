import React, { useEffect } from "react";
import { Button, Form, Input } from "antd";
import { useSubscription } from "../helpers/useSubscription";
import { navigate, useParams } from "@reach/router";
import withTemplate from "../template/WithTemplate";
import { Computer } from "../../api/models/computer";
import { fromDocumentToObject } from "../../helpers/transformDocToObject";
import { computerUpsert } from "../../api/methods/computer/computerUpsert";

const layout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 24 },
};
const tailLayout = {
  wrapperCol: { offset: 12, span: 0 },
};

const NewComputerForm = () => {
  const { computerId: _id } = useParams();
  const [form] = Form.useForm();

  const { dataFetched: existingEntry } = useSubscription(
    "computers.fetchAll",
    Computer,
    { _id }
  );

  const initialValues = existingEntry
    ? {
        ...existingEntry[0],
      }
    : {};

  useEffect(() => form.resetFields(), [initialValues]);

  const onFinish = (values) => {
    const computer = fromDocumentToObject(values, Computer);
    computerUpsert.call(computer);
    navigate("/computers", { replace: true });
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
        label="Location"
        name="location"
        rules={[{ required: true, message: "Title is required!" }]}
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

export const NewComputer = withTemplate({ withHeader: false })(NewComputerForm);
