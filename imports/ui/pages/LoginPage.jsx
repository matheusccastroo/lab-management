import React, { Fragment } from "react";
import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

const backgroundDivStyle = {
  width: "100vw",
  height: "100vh",
  backgroundColor: "#47adf3",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export const LoginPage = () => {
  const onFinish = ({ username, password }) => {
    Meteor.loginWithPassword(username, password);
  };

  return (
    <Fragment>
      <div style={backgroundDivStyle}>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Usuário é um campo obrigatório!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Usuário"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Senha é um campo obrigatório!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Senha"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Entrar
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Fragment>
  );
};
