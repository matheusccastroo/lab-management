import React from "react";
import { Button, Layout, Menu, PageHeader } from "antd";
import { Link, navigate } from "@reach/router";
import LogoutOutlined from "@ant-design/icons/lib/icons/LogoutOutlined";

const { Header, Content } = Layout;

export default function withTemplate(WrappedComponent, withHeader) {
  console.log(withHeader);
  return class extends React.Component {
    onClick = () => Meteor.logout(() => navigate("/"));
    render() {
      return (
        <Layout className="layout">
          <Header>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
              <Menu.Item key="home">
                <Link to={`/`}>Home</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to={`/persons`}>Persons</Link>
              </Menu.Item>
              <Button
                icon={<LogoutOutlined />}
                type="primary"
                shape="round"
                onClick={this.onClick}
                style={{ float: "right", marginTop: "15px" }}
              />
            </Menu>
          </Header>
          <Content style={{ padding: "0 50px" }}>
            <div className="site-layout-content" style={{ margin: "16px 0" }}>
              {withHeader && <PageHeader {...withHeader} />}
              <WrappedComponent {...this.props} />
            </div>
          </Content>
        </Layout>
      );
    }
  };
}
