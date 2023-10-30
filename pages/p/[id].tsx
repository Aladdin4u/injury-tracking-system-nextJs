import Layout from "../../components/Layout"
import Router, { useRouter } from "next/router"
import gql from "graphql-tag"
import { useMutation } from "@apollo/client"
import client from "../../lib/apollo-client"
import { ReportProps } from "../../components/Report"
import { GetServerSideProps } from "next"
import { authOptions } from "../api/auth/[...nextauth]"
import { getServerSession } from "next-auth/next"
import { Button, Space, Card, Typography } from "antd"
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { useState } from "react"
const { Title, Text } = Typography

const DeleteMutation = gql`
  mutation DeleteMutation($id: ID!) {
    deleteReport(id: $id) {
      id
      name
      date
      user {
        id
        name
      }
    }
  }
`

const Report: React.FC<{ data: { report: ReportProps } }> = props => {
  const id = useRouter().query.id
  const data = props.data.report.bodymaps
  const [deleteReport] = useMutation(DeleteMutation)
  const [bodyMaps, setBodyMaps] = useState(data)

  let name = props.data.report.name

  const authorName = props.data.report.user
    ? props.data.report.user.name
    : "Unknown user"
  return (
    <Layout>
      <main style={{ padding: "2rem" }}>
        <Card>
          <h2>{name}</h2>
          <Typography>By {authorName}</Typography>
          <Typography>{props.data.report.date.toString()}</Typography>
          <Title level={3}>Injury List</Title>
          {bodyMaps instanceof Array ?
            bodyMaps.map((bodyMap:any) => (
              <Card key={bodyMap.id} title={bodyMap.label} size="small" bordered={false} style={{ background: "#F3F4F7", margin: "8px 0" }}>
                <Text type="secondary">{bodyMap.details}</Text>
              </Card>
            )):
            null
            }
          <Space size="small" style={{marginTop: 8}}>
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => Router.push("/edit/[id]", `/edit/${id}`)}
            >
              Edit
            </Button>
            <Button
              type="primary"
              icon={<DeleteOutlined />}
              danger
              onClick={async e => {
                await deleteReport({
                  variables: {
                    id,
                  },
                })
                Router.push("/profile")
              }}
            >
              Delete
            </Button>
          </Space>
        </Card>
      </main>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getServerSession(context.req, context.res, authOptions)
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }
  const id = Number(
    Array.isArray(context.params?.id)
      ? context.params?.id[0]
      : context.params?.id
  )
  const { data } = await client.query({
    query: gql`
      query ReportQuery($id: ID!) {
        report(id: $id) {
          id
          name
          date
          bodymaps {
            id
            label
            details
          }
          user {
            id
            name
          }
        }
      }
    `,
    variables: { id },
  })

  return {
    props: {
      data,
      session,
    },
  }
}

export default Report
