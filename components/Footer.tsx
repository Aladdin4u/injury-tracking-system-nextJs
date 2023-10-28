import { Space, Flex, Typography } from "antd"
import {
  FacebookFilled,
  TwitterCircleFilled,
  InstagramFilled,
  GithubOutlined,
} from "@ant-design/icons"
const { Title, Text } = Typography

const Footer = () => {
  return (
    <footer style={{ background: "#F3F4F7", padding: "2rem" }}>
      <Flex vertical justify="center" align="center">
        <Title level={3} style={{ color: "#696CC4"}}>Injury Tracker</Title>
        <Text type="secondary" color="#363D4E">
          {" "}
          Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        </Text>
        <Space style={{ padding: 8 }}>
          <FacebookFilled style={{color: "#363D4E", fontSize: 24 }} />
          <TwitterCircleFilled style={{color: "#363D4E", fontSize: 24 }} />
          <InstagramFilled style={{color: "#363D4E", fontSize: 24 }} />
          <GithubOutlined style={{color: "#363D4E", fontSize: 24 }} />
        </Space>
        <Typography style={{color: "#363D4E" }}>&copy; 2023 Injury Tracker</Typography>
      </Flex>
    </footer>
  )
}

export default Footer
