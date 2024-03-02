import Link from "next/link"
import Chart from "./Chart"

import { 
  CloseOutlined,
  UserOutlined 
} from "@ant-design/icons"
import { 
  Button, 
  Card, 
  Form, 
  Input, 
  DatePicker, 
  Typography 
} from "antd"

interface CreateReportProps {
  label: string
  isVisible: boolean
  handleOnFinish: (values: any) => void
  handleLabel: (values: any) => void
}

export const CreateReportForm = ({
    label,
    isVisible,
    handleLabel,
    handleOnFinish,
}: CreateReportProps) => {
  
  return (
    <Form name="create-report" className="login-form" onFinish={handleOnFinish}>
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
        <DatePicker format="YYYY-MM-DD HH:mm:ss" style={{ display: "block" }} />
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
                  handleLabel(event.chart.tooltip.dataPoints[0].label)
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
                      label: (tooltipItems:any) => {
                        return tooltipItems.value
                      },
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
      <Typography style={{ marginTop: 8, width: "100%", textAlign: "center" }}>
        Or <Link href="/profile">Cancel</Link>
      </Typography>
    </Form>
  )
}
