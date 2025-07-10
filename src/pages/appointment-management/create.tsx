import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, DatePicker } from "antd";
import React from "react";

const token = localStorage.getItem("access_token");

export const AppointmentCreate = () => {
  const { formProps, saveButtonProps } = useForm({
    resource: "appointments/create/",
    redirect: "list",
    meta: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  const { selectProps: supplierSelectProps } = useSelect({
    resource: "suppliers/list/",
    optionLabel: "name",
    optionValue: "id",
    meta: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  const { selectProps: sublineSelectProps } = useSelect({
    resource: "product-sublines/list/",
    optionLabel: "name",
    optionValue: "id",
    meta: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  const { selectProps: statusSelectProps } = useSelect({
    resource: "status/list/",
    optionLabel: "name",
    optionValue: "id",
    meta: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Proveedor"
          name="supplier"
          rules={[{ required: true }]}
        >
          <Select {...supplierSelectProps} placeholder="Seleccione un proveedor" />
        </Form.Item>

        <Form.Item
          label="Sublínea"
          name="product_subline"
          rules={[{ required: true }]}
        >
          <Select {...sublineSelectProps} placeholder="Seleccione una sublínea" />
        </Form.Item>

        <Form.Item
          label="Estado"
          name="status"
          rules={[{ required: true }]}
        >
          <Select {...statusSelectProps} placeholder="Seleccione el estado" />
        </Form.Item>

        <Form.Item
          label="Fecha Programada"
          name="scheduled_delivery"
          rules={[{ required: true }]}
        >
          <DatePicker
            showTime
            format="YYYY-MM-DDTHH:mm:ss.SSS[Z]"
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item label="Fecha Real" name="actual_delivery">
          <DatePicker
            showTime
            format="YYYY-MM-DDTHH:mm:ss.SSS[Z]"
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item label="Observaciones" name="remarks">
          <Input.TextArea rows={4} placeholder="Observaciones..." />
        </Form.Item>
      </Form>
    </Create>
  );
};
