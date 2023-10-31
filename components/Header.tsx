import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/router"
import { useSession, signOut } from "next-auth/react"
import { Avatar, Space, Button, Flex, Menu } from "antd"
import { LogoutOutlined } from "@ant-design/icons"

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
          style={{ minWidth: 0, background: "none", color: "#696cc4" }}
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
                    <Space>
                      <Link href="/profile">
                        {image && (
                          <span title="Profile">
                            <Avatar src={image} />
                          </span>
                        )}
                      </Link>
                      <Button
                        type="link"
                        size="large"
                        icon={<LogoutOutlined />}
                        danger
                        onClick={() => signOut()}
                      >
                        Sign out
                      </Button>
                    </Space>
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
            },
            {
              label: (
                <>
                  {session ? (
                    <Link href="/create" legacyBehavior>
                      <a data-active={isActive("/create")} className="nav-link">
                        Create
                      </a>
                    </Link>
                  ) : null}
                </>
              ),
              key: 3,
            },
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

        .nav-link {
        }
        .nav-link:hover {
          color: white !important;
        }
      `}</style>
    </nav>
  )
}

export default Header
