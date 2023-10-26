import React, { useState } from "react"
import type { GetServerSideProps } from "next"
import { useSession } from "next-auth/react"
import Layout from "../components/Layout"
import Router from "next/router"
import gql from "graphql-tag"
import { useMutation } from "@apollo/client"
import { authOptions } from "./api/auth/[...nextauth]"
import { getServerSession } from "next-auth/next"
import { CloseOutlined, UserOutlined } from "@ant-design/icons"
import { Button, Card, Form, Input, DatePicker, Space } from "antd"
import Link from "next/link"
import Chart from "../components/Chart"

const CreateReportMutation = gql`
  mutation CreateReportMutation(
    $name: String!
    $date: String!
    $email: String!
    $bodymaps: [BodyMapInput!]!
  ) {
    createReport(name: $name, date: $date, bodymaps: $bodymaps, email: $email) {
      id
      name
      date
      bodymaps {
        label
        details
      }
      user {
        id
        name
      }
    }
  }
`

function Report() {
  const { data: session } = useSession()
  const [email, setEmail] = useState(session?.user?.email)
  const [createReport] = useMutation(CreateReportMutation)
  const [label, setLabel] = useState("")

  const onFinish = async (values: any) => {
    let data = {
      name: values.name,
      date: values["date"].format("YYYY-MM-DD HH:mm:ss"),
      bodymaps: values.BodyMaps,
      email: email,
    }
    console.log("Received values of form: ", data)
    await createReport({
      variables: data,
    })
    Router.push("/")
  }

  const toolChart = (tooltipItems: any) => {
    return tooltipItems.label
  }

  return (
    <Layout>
      <Form
        name="create-report"
        className="login-form"
        onFinish={onFinish}
      >
        <Form.Item
          name="name"
          label="Reporter Name"
          rules={[
            { required: true, message: "Please input your Reporter Name!" },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Reporter Name"
          />
        </Form.Item>
        <Form.Item
          name="date"
          label="Date Time"
          rules={[{ required: true, message: "Please input your Date!" }]}
        >
          <DatePicker format="YYYY-MM-DD HH:mm:ss" />
        </Form.Item>
        <p>Click on the bodymap image below to list injury</p>
        <Form.List name="BodyMaps">
          {(fields, { add, remove }) => (
            <div
              style={{
                display: "flex",
                rowGap: 16,
                flexDirection: "column",
              }}
            >
              <Chart
                options={{
                  onClick: (event: any) => {
                    add()
                    setLabel(event.chart.tooltip.dataPoints[0].label)
                  },
                  scales: {
                    x: {
                      min: 0,
                      max: 100,
                      grid: {
                        display: false,
                      },
                      ticks: {
                        display: false,
                      },
                    },
                    y: {
                      min: 0,
                      max: 100,
                      grid: {
                        display: false,
                      },
                      ticks: {
                        display: false,
                      },
                    },
                  },
                  elements: {
                    point: {
                      pointStyle: "circle",
                    },
                  },
                  plugins: {
                    tooltip: {
                      yAlign: "bottom",
                      displayColors: false,
                      callbacks: {
                        events: ["click"],
                        label: toolChart,
                        title: () => {
                          return ""
                        },
                      },
                    },
                  },
                }}
              />
              {fields.map(field => (
                <Card
                  size="small"
                  title={`List Injury ${field.name + 1}`}
                  key={field.key}
                  extra={
                    <CloseOutlined
                      onClick={() => {
                        remove(field.name)
                      }}
                    />
                  }
                >
                  <Form.Item
                    label="label"
                    name={[field.name, "label"]}
                    initialValue={label}
                    rules={[
                      {
                        required: true,
                        message: "Please input Injury Label!",
                      },
                    ]}
                  >
                    <Input placeholder="Label" disabled />
                  </Form.Item>
                  <Form.Item
                    label="Description"
                    name={[field.name, "details"]}
                    rules={[
                      {
                        required: true,
                        message: "Please input Injury description!",
                      },
                    ]}
                  >
                    <Input placeholder="Describe the Injury" />
                  </Form.Item>
                </Card>
              ))}
            </div>
          )}
        </Form.List>
        <Space direction="vertical">
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Create
            </Button>
            Or <Link href="/">Cancel</Link>
          </Form.Item>
        </Space>
      </Form>
    </Layout>
  )
}

export default Report

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getServerSession(context.req, context.res, authOptions)
  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    }
  }

  return {
    props: {
    },
  }
}
