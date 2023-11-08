import { Space, Flex, Typography } from "antd"
import {
  TwitterCircleFilled,
  InstagramFilled,
  GithubOutlined,
  LinkedinFilled,
} from "@ant-design/icons"
import Link from "next/link"
const { Title, Text } = Typography
import dayjs from "dayjs"

const Footer = () => {
  const year = dayjs().format("YYYY");
  
  return (
    <footer
      style={{ background: "#F3F4F7", padding: "2rem", textAlign: "center" }}
    >
      <Flex vertical justify="center" align="center">
        <Title level={3} style={{ color: "#696CC4" }}>
          Injury Tracker
        </Title>
        <Text type="secondary" color="#363D4E">
          {" "}
          Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        </Text>
        <Space style={{ padding: 8 }}>
          <Link href="https://www.linkedin.com/in/aladdin4u/">
            <LinkedinFilled style={{ color: "#363D4E", fontSize: 24 }} />
          </Link>
          <Link href="https://twitter.com/devaladdin">
            <TwitterCircleFilled style={{ color: "#363D4E", fontSize: 24 }} />
          </Link>
          <InstagramFilled style={{ color: "#363D4E", fontSize: 24 }} />
          <Link href="https://github.com/Aladdin4u/injury-tracking-system-nextJs">
            <GithubOutlined style={{ color: "#363D4E", fontSize: 24 }} />
          </Link>
        </Space>
        <Typography style={{ color: "#363D4E" }}>
          &copy; {year} Injury Tracker
        </Typography>
      </Flex>
    </footer>
  )
}

export default Footer
