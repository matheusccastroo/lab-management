import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "@reach/router";

const { Header, Content } = Layout;

export const PageTemplate = ({ component: Component, ...props }) => {
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
          <Menu.Item key="home">
            <Link to={`/`}>Home</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <div className="site-layout-content" style={{ margin: "16px 0" }}>
          <Component {...props} />
        </div>
      </Content>
    </Layout>
  );
};
