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
import { Button, Card, Form, Input, DatePicker, Row, Col } from "antd"
import Link from "next/link"
import Chart from "../../components/Chart"

const EditReportMutation = gql`
  mutation EditReportMutation($id: ID!, $name: String!, $date: String!) {
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

  const handleLabel = (e: any) => {
    setLabel(e.target.value)
  }

  const onFinish = async (values: any) => {
    let data = {
      id: id,
      name: values.name,
      date: values["date"].format("YYYY-MM-DD HH:mm:ss"),
    }
    console.log("Received values of form: ", data)
    await editReport({
      variables: data,
    })
  }

  const onEditBodyMap = async (values: any) => {
    let b = bodyMaps.map(body => body)
    const data = {
      id: b[values].id,
      label: b[values].label,
      details: b[values].details,
    }
    console.log("Received values of form: ", data, b[values])
    await editBodyMap({
      variables: data,
    })
    Router.push("/")
  }

  const onDeleteBodyMap = async (values: any) => {
    let b = bodyMaps.map(body => body)
    let data = {
      id: b[values].id,
    }
    console.log("Received values of form: ", data, values)
    await deleteBodyMap({
      variables: data,
    })
  }
  const onCreateBodyMap = async (values: any) => {
    let bodys = values.BodyMaps.map((body: any) => {
      return {
        label: body.label,
        details: body.details,
      }
    })
    let data = {
      reportId: id,
      label: values.BodyMaps[0].label,
      details: values.BodyMaps[0].details,
    }
    console.log("Received values of form: ", data, bodys)
    await createBodyMap({
      variables: data,
    })
  }

  const toolChart = (tooltipItems: any) => {
    return tooltipItems.label
  }

  return (
    <Layout>
      <div>
        <h1>Edit Report</h1>
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
            <DatePicker format="YYYY-MM-DD HH:mm:ss" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Update
            </Button>
          </Form.Item>
        </Form>
      </div>

      <div>
        <h1>Edit BodyMaps</h1>
        <Form
          name="edit-bodyMap"
          className="login-form"
          initialValues={{
            BodyMaps: bodyMaps,
          }}
        >
          <Form.List name="BodyMaps">
            {fields => (
              <div
                style={{
                  display: "flex",
                  rowGap: 16,
                  flexDirection: "column",
                }}
              >
                {fields.map((field, key, value) => (
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
                      justify="space-between"
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
                      <Col className="gutter-row" span={2}>
                        <Form.Item>
                          <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            onClick={id => onEditBodyMap(field.name)}
                          >
                            Update
                          </Button>
                        </Form.Item>
                      </Col>
                      <Col className="gutter-row" span={2}>
                        <Form.Item name={[field.name, "id"]}>
                          <Button
                            size="small"
                            type="default"
                            onClick={id => onDeleteBodyMap(field.name)}
                            icon={<DeleteOutlined />}
                            danger
                          ></Button>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Card>
                ))}
              </div>
            )}
          </Form.List>
        </Form>
      </div>
      <div>
        <h1>Create BodyMaps</h1>
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
            >
              Create injury
            </Button>
          </Form.Item>
        </Form>
      </div>
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

export default Edit
