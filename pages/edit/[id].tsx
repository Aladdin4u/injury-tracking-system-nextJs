import Layout from "../../components/Layout"
import Router, { useRouter } from "next/router"
import gql from "graphql-tag"
import { useMutation } from "@apollo/client"
import client from "../../lib/apollo-client"
import { ReportProps } from "../../components/Report"
import { GetServerSideProps } from "next"
import { authOptions } from "../api/auth/[...nextauth]"
import { getServerSession } from "next-auth/next"
import { useState } from "react"
import { CloseOutlined, UserOutlined, DeleteOutlined } from "@ant-design/icons"
import dayjs from "dayjs"
import { Button, Card, Form, Input, DatePicker, Row, Col, Space } from "antd"
import Chart from "../../components/Chart"

const EditReportMutation = gql`
  mutation EditReportMutation($id: ID!, $name: String!, $date: Date!) {
    editReport(id: $id, name: $name, date: $date) {
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
`
const CreateBodyMapMutation = gql`
  mutation CreateBodyMapMutation(
    $reportId: ID!
    $label: String!
    $details: String!
  ) {
    createBodyMap(reportId: $reportId, label: $label, details: $details) {
      id
      label
      details
      report {
        id
        name
      }
    }
  }
`
const EditBodyMapMutation = gql`
  mutation EditBodyMapMutation($id: ID!, $label: String!, $details: String!) {
    editBodyMap(id: $id, label: $label, details: $details) {
      id
      label
      details
    }
  }
`
const DeleteBodyMapMutation = gql`
  mutation DeleteBodyMapMutation($id: ID!) {
    deleteBodyMap(id: $id) {
      id
      label
      details
    }
  }
`

const Edit: React.FC<{
  data: { report: ReportProps; session: any }
}> = props => {
  const id = useRouter().query.id

  const [editReport] = useMutation(EditReportMutation)
  const [createBodyMap] = useMutation(CreateBodyMapMutation)
  const [editBodyMap] = useMutation(EditBodyMapMutation)
  const [deleteBodyMap] = useMutation(DeleteBodyMapMutation)
  const [name, setName] = useState(props.data.report.name)
  const [date, setDate] = useState(dayjs(props.data.report.date))
  const [bodyMaps, setBodyMaps] = useState(props.data.report.bodymaps)
  const [label, setLabel] = useState("")
  const [ListId, setListId] = useState(0)

  const onFinish = async (values: any) => {
    let data = {
      id: id,
      name: values.name,
      date: values["date"].format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
    }
    await editReport({
      variables: data,
    })
    Router.push("/p/[id]", `/p/${id}`)
  }

  const onEditBodyMap = async (values: any) => {
    let data = values.BodyMaps[ListId]
    await editBodyMap({
      variables: data,
    })
    Router.push("/p/[id]", `/p/${id}`)
  }

  const onDeleteBodyMap = async (values: any) => {
    if (bodyMaps instanceof Array) {
      let b = bodyMaps.map(body => body)
      let data = {
        id: b[values].id,
      }
      await deleteBodyMap({
        variables: data,
      })
      Router.push("/p/[id]", `/p/${id}`)
    }
  }
  const onCreateBodyMap = async (values: any) => {
    let data = {
      reportId: id,
      label: values.BodyMaps[0].label,
      details: values.BodyMaps[0].details,
    }
    await createBodyMap({
      variables: data,
    })
    Router.push("/p/[id]", `/p/${id}`)
  }

  const toolChart = (tooltipItems: any) => {
    return tooltipItems.label
  }

  return (
    <Layout>
      <main style={{ padding: "2rem" }}>
        <div>
          <h1 style={{ color: "#696CC4" }}>Edit Report</h1>
          <Form
            name="create-report"
            className="login-form"
            initialValues={{
              name: name,
              date: date,
            }}
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
              <DatePicker
                format="YYYY-MM-DD HH:mm:ss"
                style={{ display: "block" }}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                block
              >
                Update
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div>
          <h1 style={{ color: "#696CC4" }}>Edit BodyMaps</h1>
          <Form
            name="edit-bodyMap"
            className="login-form"
            initialValues={{
              BodyMaps: bodyMaps,
            }}
            onFinish={onEditBodyMap}
          >
            <Form.List name="BodyMaps">
              {(fields, { add, remove }) => (
                <div
                  style={{
                    display: "flex",
                    rowGap: 16,
                    flexDirection: "column",
                  }}
                >
                  {fields.map(field => (
                    <Card
                      size="small"
                      title={`List Injury ${field.name + 1}`}
                      key={field.key}
                    >
                      <Row
                        gutter={{
                          xs: 8,
                          sm: 16,
                          md: 24,
                          lg: 32,
                        }}
                        justify="space-around"
                        align="middle"
                        wrap
                      >
                        <Col className="gutter-row" span={6}>
                          <Form.Item
                            label="label"
                            name={[field.name, "label"]}
                            rules={[
                              {
                                required: true,
                                message: "Please input Injury Label!",
                              },
                            ]}
                          >
                            <Input placeholder="Label" disabled />
                          </Form.Item>
                        </Col>
                        <Col className="gutter-row" span={10}>
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
                        </Col>
                        <Space size="small" wrap>
                          <Form.Item name={[field.name, "id"]}>
                            <Button
                              type="primary"
                              htmlType="submit"
                              className="login-form-button"
                              onClick={() => setListId(field.name)}
                            >
                              Update
                            </Button>
                          </Form.Item>
                          <Form.Item name={[field.name, "id"]}>
                            <Button
                              size="small"
                              type="default"
                              onClick={id => {
                                onDeleteBodyMap(field.name)
                                remove(field.name)
                              }}
                              icon={<DeleteOutlined />}
                              danger
                            ></Button>
                          </Form.Item>
                        </Space>
                      </Row>
                    </Card>
                  ))}
                </div>
              )}
            </Form.List>
          </Form>
        </div>
        <div>
          <h1 style={{ color: "#696CC4" }}>Create BodyMaps</h1>
          <p>Click on the bodymap image below to list injury</p>
          <Form
            name="create-bodyMap"
            className="login-form"
            onFinish={onCreateBodyMap}
          >
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
                      <Form.Item style={{ marginTop: 12 }}>
                        <Button
                          type="primary"
                          htmlType="submit"
                          className="login-form-button"
                          block
                        >
                          Create injury
                        </Button>
                      </Form.Item>
                    </Card>
                  ))}
                </div>
              )}
            </Form.List>
          </Form>
        </div>
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
    },
  }
}

export default Edit
