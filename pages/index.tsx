import Layout from "../components/Layout"
import { Button, Card, Flex, Typography, DatePicker, Space } from "antd"

const Blog = () => {
  return (
    <Layout>
      <main>
      <Card hoverable bodyStyle={{ padding: 0, overflow: 'hidden' }}>
    <Flex justify="space-between">
      <img
        alt="avatar"
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        style={{display: 'block',width: 573}}
      />
      <Flex vertical align="flex-end" justify="space-between" style={{ padding: 32 }}>
        <Typography.Title level={3}>
          “A web application to record and track the injuries reported by a person”
        </Typography.Title>
        <Button type="primary" href="/create">
          Get Started
        </Button>
      </Flex>
    </Flex>
  </Card>
      </main>
    </Layout>
  )
}


export default Blog
