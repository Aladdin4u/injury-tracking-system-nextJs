import React, { useState } from "react"
import type { GetServerSideProps } from "next"
import Layout from "../components/Layout"
import Router from "next/router"
import gql from "graphql-tag"
import { useMutation } from "@apollo/client"
import { authOptions } from "./api/auth/[...nextauth]"
import { getServerSession } from "next-auth/next"
import { CloseOutlined, UserOutlined } from "@ant-design/icons"
import { Button, Card, Form, Input, DatePicker, Typography, Alert } from "antd"
import Link from "next/link"
import Chart from "../components/Chart"

const CreateReportMutation = gql`
  mutation CreateReportMutation(
    $name: String!
    $date: Date!
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

const Create: React.FC<{ data: string }> = props => {
  const [email, setEmail] = useState(props?.data)
  const [createReport] = useMutation(CreateReportMutation)
  const [label, setLabel] = useState("")
  const [visible, setVisible] = useState(false)

  const onFinish = async (values: any) => {
    setVisible(false)
    console.log(values.BodyMaps)

    if (values.BodyMaps == null || values.BodyMaps.length < 1) {
      console.log("invalid")
      setVisible(true)
      return
    }
    let data = {
      name: values.name,
      date: values["date"].format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
      bodymaps: values.BodyMaps,
      email: email,
    }
    await createReport({
      variables: data,
    })
    Router.push("/profile")
  }

  const handleClose = () => {
    setVisible(false)
  }

  const toolChart = (tooltipItems: any) => {
    return tooltipItems.label
  }

  return (
    <Layout>
      <main style={{ padding: "2rem" }}>
        <h1 style={{ color: "#696CC4" }}>Create Reports</h1>
        {visible && (
          <Alert
            message="Please select injury type from body map picture below"
            type="error"
            closable
            afterClose={handleClose}
            showIcon
            style={{ marginBottom: 8 }}
          />
        )}
        <Form name="create-report" className="login-form" onFinish={onFinish}>
          <Form.Item
            name="name"
            label="Reporter Name"
            rules={[
              { required: true, message: "Please enter your Reporter Name!" },
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
            rules={[{ required: true, message: "Please enter your Date!" }]}
          >
            <DatePicker
              format="YYYY-MM-DD HH:mm:ss"
              style={{ display: "block" }}
            />
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
                          message: "Please enter Injury Label!",
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
                          message: "Please enter Injury description!",
                        },
                      ]}
                    >
                      <Input placeholder="Describe the Injury" autoFocus />
                    </Form.Item>
                  </Card>
                ))}
              </div>
            )}
          </Form.List>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              block
              style={{ marginTop: 8 }}
            >
              Create
            </Button>
          </Form.Item>
          <Typography
            style={{ marginTop: 8, width: "100%", textAlign: "center" }}
          >
            Or <Link href="/profile">Cancel</Link>
          </Typography>
        </Form>
      </main>
    </Layout>
  )
}

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

  const data = session?.user?.email

  return {
    props: {
      data,
    },
  }
}

export default Create
