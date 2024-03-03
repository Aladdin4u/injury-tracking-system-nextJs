import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/router"
import { useSession, signOut } from "next-auth/react"
import { Avatar, Space, Button, Flex, Menu, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { DownOutlined, LogoutOutlined } from '@ant-design/icons';


const items: MenuProps['items'] = [
  {
    label: <a href="/profile">Profile</a>,
    key: '0',
  },
  {
    label: <a href="/create">Create</a>,
    key: '1',
  },
  {
    type: 'divider',
  },
  {
    label: <Button
    type="link"
    size="large"
    icon={<LogoutOutlined />}
    danger
    onClick={() => signOut()}
  >
    Sign out
  </Button>,
    key: '3',
  },
];

const Header = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const [image, setImage] = useState(session?.user?.image)

  function isActive(pathname: string) {
    return router.pathname === pathname
  }

  return (
    <nav>
      <Flex justify="space-between" align="center">
        <div>
          <Link href="/" legacyBehavior>
            <a className="bold" data-active={isActive("/")}>
              Injury Tracker
            </a>
          </Link>
        </div>
        <Menu
          style={{
            minWidth: 200,
            background: "none",
            color: "#696cc4",
            justifyContent: "flex-end",
          }}
          mode="horizontal"
          items={[
            {
              label: (
                <Link href="/reports" legacyBehavior>
                  <a className="nav-link" data-active={isActive("/reports")}>
                    Report
                  </a>
                </Link>
              ),
              key: 1,
            },
            {
              label: (
                <>
                  {session ? (
                    <Dropdown menu={{ items }} trigger={['click']}>
                    <a className="nav-link" onClick={(e) => e.preventDefault()}>
                      <Space>
                      {image && (
                          <span title="Profile">
                            <Avatar src={image} alt="user image" />
                          </span>
                        )}
                        <DownOutlined />
                      </Space>
                    </a>
                  </Dropdown>
                  ) : (
                    <Link href="/api/auth/signin" legacyBehavior>
                      <a
                        className="nav-link"
                        data-active={isActive("/api/auth/signin")}
                      >
                        Sign in
                      </a>
                    </Link>
                  )}
                </>
              ),
              key: 2,
            }
          ]}
        />
      </Flex>
      <style jsx>{`
        nav {
          background: #16151f;
          padding: 1rem;
        }

        .bold {
          font-weight: bold;
          font-size: 1rem;
        }

        a {
          text-decoration: none;
          color: #696cc4;
          display: inline-block;
        }

        .nav-link:hover {
          color: white !important;
        }
        .ant-menu-light.ant-menu-horizontal > .ant-menu-item {
          border-bottom-color: #696cc4 !important;
        }
      `}</style>
    </nav>
  )
}

export default Header
