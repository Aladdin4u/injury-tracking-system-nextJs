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
      </main>
    </Layout>
  )
}

export default Blog
