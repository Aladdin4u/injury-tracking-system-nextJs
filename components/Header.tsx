import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/router"
import { useSession, signIn, signOut } from "next-auth/react"
import { Avatar, Space, Button, Flex } from "antd"
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
        <Space size="small">
          <Link href="/reports" legacyBehavior>
            <a data-active={isActive("/reports")} className="nav-link">
              Report
            </a>
          </Link>
          {session && (
            <Link href="/create" legacyBehavior>
              <a data-active={isActive("/create")} className="nav-link">
                Create
              </a>
            </Link>
          )}
          {session ? (
            <Space>
              <Link href="/profile">
                {image && <Avatar src={image} />}
              </Link>
              <Button
                type="default"
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
                data-active={isActive("/api/auth/signin")}
                className="nav-link"
              >
                Sign in
              </a>
            </Link>
          )}
        </Space>
      </Flex>
      <style jsx>{`
        nav {
          // background: purple;
          padding: 2rem;
        }

        .bold {
          font-weight: bold;
          font-size: 1rem;
        }

        a {
          text-decoration: none;
          color: #000;
          display: inline-block;
        }

        .left a[data-active="true"] {
          color: gray;
        }

        a + a {
          margin-left: 1rem;
        }

        .nav-link {
          border: 1px solid black;
          padding: 0.5rem 1rem;
          border-radius: 3px;
        }
        .nav-link:hover {
          color: white;
          background: gray;
        }
      `}</style>
    </nav>
  )
}

export default Header
