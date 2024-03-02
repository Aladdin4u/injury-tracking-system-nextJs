import Chart from "./Chart"

import { 
  Button, 
  Card, 
  Form, 
  Input 
} from "antd"
import { CloseOutlined } from "@ant-design/icons"

interface CreateBodyMapProps {
  label: string
  handleOnFinish: (values: any) => void
  handleLabel: (values: any) => void
}

export const CreateBodyMapForm = ({
  label,
  handleLabel,
  handleOnFinish,
}: CreateBodyMapProps) => {
  return (
    <Form
      name="create-bodyMap"
      className="login-form"
      onFinish={handleOnFinish}
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
  )
}
