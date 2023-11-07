import Layout from "../components/Layout"
import {
  Button,
  Card,
  Flex,
  Typography,
  Row,
  Col,
  Divider,
  Grid,
  Space,
} from "antd"
const { Title, Text } = Typography
const { useBreakpoint } = Grid

const Blog = () => {
  const screens = useBreakpoint()
  const span = screens.xl ? 8 : screens.md || screens.sm ? 12 : 24
  const hero = screens.xl ? 12 : screens.md || screens.sm ? 12 : 24

  return (
    <Layout>
      <main>
        <Row gutter={16} style={{ background: "white" }}>
          <Col span={hero}>
            <img
              alt="avatar"
              src="https://source.unsplash.com/brown-and-black-clipboard-with-white-spinal-cord-print-manual-IG96K_HiDk0"
              style={{ width: "100%" }}
            />
          </Col>
          <Col span={hero}>
            <Flex
              vertical
              justify="space-between"
              align="center"
              style={{ padding: "2rem", height: "100%" }}
            >
              <Space
                direction="vertical"
                style={{ marginBottom: "2rem", textAlign: "center" }}
              >
                <Typography.Title level={1}>
                  Simplify Injury Reporting
                </Typography.Title>
                <Typography.Title level={3}>
                  Effortlessly record and manage injuries, ensuring efficiency
                  and compliance.
                </Typography.Title>
              </Space>
              <Space size="middle">
                <Button type="primary" href="/create" block>
                  Get Started
                </Button>
                <Button type="default" href="/create" block>
                  Request a Demo
                </Button>
              </Space>
            </Flex>
          </Col>
        </Row>
        <Flex
          vertical
          align="center"
          wrap="wrap"
          style={{ background: "#F3F4F7", padding: "3rem", textAlign: "center" }}
        >
          <Title level={2}>Our Features</Title>
          <Divider style={{ textAlign: "center" }}>why people love our product?</Divider>
          <Row gutter={16} style={{ marginTop: 16 }} wrap={true}>
            <Col span={span}>
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
            <Col span={span}>
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
            <Col span={span}>
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
            <Col span={span}>
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
            <Col span={span}>
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
            <Col span={span}>
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
        <Flex
          vertical
          align="center"
          style={{ background: "white", padding: "3rem", textAlign: "center" }}
        >
          <Title level={2}>Benefits</Title>
          <Divider style={{ textAlign: "center" }}>
            Process of tracking injuries
          </Divider>
          <Row gutter={16} style={{ marginTop: 16 }}>
            <Col span={span}>
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
            <Col span={span}>
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
            <Col span={span}>
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
