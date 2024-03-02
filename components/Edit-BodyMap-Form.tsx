import {
  Button, 
  Card, Form, 
  Input,
  Row, 
  Col, 
  Space 
} from "antd"
import { DeleteOutlined } from "@ant-design/icons"

interface BodyMaps {
  id: number;
  label: string;
  details: string;
}

interface EditBodyMapProps {
  bodyMaps: BodyMaps;
  handleListId: (values: number) => void;
  handleOnFinish: (values: any) => void;
  handleDeleteBodyMap: (values: number) => void;
}

export const EditBodyMapForm = ({
  bodyMaps,
  handleListId,
  handleOnFinish,
  handleDeleteBodyMap,
}: EditBodyMapProps) => {
  return (
    <Form
      name="edit-bodyMap"
      className="login-form"
      initialValues={{
        BodyMaps: bodyMaps,
      }}
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
                        onClick={() => handleListId(field.name)}
                      >
                        Update
                      </Button>
                    </Form.Item>
                    <Form.Item name={[field.name, "id"]}>
                      <Button
                        size="small"
                        type="default"
                        onClick={() => {
                          handleDeleteBodyMap(field.name)
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
  )
}
