import Layout from "../components/Layout"
import {
  Button,
  Card,
  Flex,
  Typography,
  DatePicker,
  Space,
  Row,
  Col,
  Divider,
} from "antd"
const { Title, Text } = Typography

const Blog = () => {
  return (
    <Layout>
      <main>
        <Card
          hoverable
          bodyStyle={{ padding: 0, overflow: "hidden", backgroundColor: "#696CC4" }}
        >
          <Flex justify="space-between">
            <img
              alt="avatar"
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              style={{ display: "block", width: 573 }}
            />
            <Flex
              vertical
              align="flex-end"
              justify="space-between"
              style={{ padding: 32, background: "#F3F4F7" }}
            >
              <Typography.Title level={3}>
                “A web application to record and track the injuries reported by
                a person”
              </Typography.Title>
              <Button type="primary" href="/create" block>
                Get Started
              </Button>
            </Flex>
          </Flex>
        </Card>
        <Flex vertical align="center" style={{ background: "#F3F4F7", padding: "3rem" }}>
          <Title level={2}>Our Features</Title>
          <Divider>why people love our product?</Divider>
          <Row gutter={16} style={{ marginTop: 16 }}>
            <Col span={8}>
              <Card bordered={false} style={{ background: "none" }}>
                <Title level={3}>Easy Injury Reporting</Title>
                <Text type="secondary">
                  {" "}
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Veniam assumenda, aperiam voluptates recusandae similique
                  tenetur mollitia. Rem quam architecto libero ratione repellat!
                  Eum nam voluptatum deleniti quae velit reprehenderit
                  praesentium.
                </Text>
              </Card>
            </Col>
            <Col span={8}>
              <Card bordered={false} style={{ background: "none" }}>
                <Title level={3}>Customizable Forms</Title>
                <Text type="secondary">
                  {" "}
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Veniam assumenda, aperiam voluptates recusandae similique
                  tenetur mollitia. Rem quam architecto libero ratione repellat!
                  Eum nam voluptatum deleniti quae velit reprehenderit
                  praesentium.
                </Text>
              </Card>
            </Col>
            <Col span={8}>
              <Card bordered={false} style={{ background: "none" }}>
                <Title level={3}>Real-time Tracking</Title>
                <Text type="secondary">
                  {" "}
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Veniam assumenda, aperiam voluptates recusandae similique
                  tenetur mollitia. Rem quam architecto libero ratione repellat!
                  Eum nam voluptatum deleniti quae velit reprehenderit
                  praesentium.
                </Text>
              </Card>
            </Col>
            <Col span={8}>
              <Card bordered={false} style={{ background: "none" }}>
                <Title level={3}>Secure Data Storage</Title>
                <Text type="secondary">
                  {" "}
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Veniam assumenda, aperiam voluptates recusandae similique
                  tenetur mollitia. Rem quam architecto libero ratione repellat!
                  Eum nam voluptatum deleniti quae velit reprehenderit
                  praesentium.
                </Text>
              </Card>
            </Col>
            <Col span={8}>
              <Card bordered={false} style={{ background: "none" }}>
                <Title level={3}>Analytics and Reporting</Title>
                <Text type="secondary">
                  {" "}
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Veniam assumenda, aperiam voluptates recusandae similique
                  tenetur mollitia. Rem quam architecto libero ratione repellat!
                  Eum nam voluptatum deleniti quae velit reprehenderit
                  praesentium.
                </Text>
              </Card>
            </Col>
            <Col span={8}>
              <Card bordered={false} style={{ background: "none" }}>
                <Title level={3}>Mobile Accessibility</Title>
                <Text type="secondary">
                  {" "}
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Veniam assumenda, aperiam voluptates recusandae similique
                  tenetur mollitia. Rem quam architecto libero ratione repellat!
                  Eum nam voluptatum deleniti quae velit reprehenderit
                  praesentium.
                </Text>
              </Card>
            </Col>
          </Row>
        </Flex>
        <Flex vertical align="center" style={{ background: "white", padding: "3rem" }}>
          <Title level={2}>Benefits</Title>
          <Divider>Process of recording and tracking injuries</Divider>
          <Row gutter={16} style={{ marginTop: 16 }}>
            <Col span={8}>
              <Card bordered={false} style={{ background: "none" }}>
                <Title level={3}>Improved Record Keeping</Title>
                <Text type="secondary">
                  {" "}
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Veniam assumenda, aperiam voluptates recusandae similique
                  tenetur mollitia. Rem quam architecto libero ratione repellat!
                  Eum nam voluptatum deleniti quae velit reprehenderit
                  praesentium.
                </Text>
              </Card>
            </Col>
            <Col span={8}>
              <Card bordered={false} style={{ background: "none" }}>
                <Title level={3}>Efficient and Accurate Reporting</Title>
                <Text type="secondary">
                  {" "}
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Veniam assumenda, aperiam voluptates recusandae similique
                  tenetur mollitia. Rem quam architecto libero ratione repellat!
                  Eum nam voluptatum deleniti quae velit reprehenderit
                  praesentium.
                </Text>
              </Card>
            </Col>
            <Col span={8}>
              <Card bordered={false} style={{ background: "none" }}>
                <Title level={3}>Enhanced Data Security</Title>
                <Text type="secondary">
                  {" "}
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Veniam assumenda, aperiam voluptates recusandae similique
                  tenetur mollitia. Rem quam architecto libero ratione repellat!
                  Eum nam voluptatum deleniti quae velit reprehenderit
                  praesentium.
                </Text>
              </Card>
            </Col>
          </Row>
        </Flex>
      </main>
    </Layout>
  )
}

export default Blog
