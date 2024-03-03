import { 
    Button, 
    Form, 
    Input, 
    DatePicker
} from "antd"
import { UserOutlined } from "@ant-design/icons"

interface EditReportProps {
    name: string
    date: any
    handleOnFinish: (values: any) => void
  }

export const EditReportForm = ({
    name,
    date,
    handleOnFinish
}: EditReportProps) => {
    return (
        <Form
            name="edit-report"
            className="login-form"
            initialValues={{
              name: name,
              date: date,
            }}
            onFinish={handleOnFinish}
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
    )
}