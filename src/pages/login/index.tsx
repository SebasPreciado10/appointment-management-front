import { AuthPage } from "@refinedev/antd";
import { Form, Input, Button } from "antd";
import { useLogin } from "@refinedev/core";

export const Login = () => {
  const { mutate: login, isLoading } = useLogin();

  return (
    <AuthPage
      type="login"
      hideForm={true}
      renderContent={(content, title) => {
        return (
          <div style={{ maxWidth: 400, margin: "auto", paddingTop: 80 }}>
            <h2 style={{ textAlign: "center" }}>Appointment Management</h2>
            <Form
              name="custom-login"
              layout="vertical"
              initialValues={{ username: "demo", password: "demodemo" }}
              onFinish={(values) => login(values)}
            >
              <Form.Item
                name="username"
                label="Usuario"
                rules={[{ required: true, message: "Ingresa tu usuario" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="password"
                label="Contraseña"
                rules={[{ required: true, message: "Ingresa tu contraseña" }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={isLoading}
                >
                  Iniciar sesión
                </Button>
              </Form.Item>
            </Form>
          </div>
        );
      }}
    />
  );
};
