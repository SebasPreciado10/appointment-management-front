import {
  Edit,
  useForm,
  useSelect,
  TextField,
} from "@refinedev/antd";
import { Form, Input, DatePicker, Select, Typography } from "antd";
import { useParsed, useOne } from "@refinedev/core";
import dayjs from "dayjs";
import React from "react";

const { Title } = Typography;

export const AppointmentEdit = () => {
  const { id } = useParsed();
  const token = localStorage.getItem("access_token");

  const {
    formProps,
    saveButtonProps,
    formLoading,
    onFinish: baseOnFinish,
  } = useForm({
    resource: `appointments/update/${id}/`,
    redirect: "list",
    meta: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "put",
    },
  });

  const { data: appointmentData, isLoading: readLoading } = useOne({
    resource: "appointments/read",
    id: `${id}/`,
    meta: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  const appointment = appointmentData?.data;

  const { selectProps: supplierSelectProps, queryResult: supplierQuery } = useSelect({
    resource: "suppliers/list/",
    optionLabel: "name",
    optionValue: "id",
    meta: { headers: { Authorization: `Bearer ${token}` } },
  });

  const { selectProps: sublineSelectProps, queryResult: sublineQuery } = useSelect({
    resource: "product-sublines/list/",
    optionLabel: "name",
    optionValue: "id",
    meta: { headers: { Authorization: `Bearer ${token}` } },
  });

  const { selectProps: statusSelectProps, queryResult: statusQuery } = useSelect({
    resource: "status/list/",
    optionLabel: "name",
    optionValue: "id",
    meta: { headers: { Authorization: `Bearer ${token}` } },
  });

  const findIdByName = (data: any[], name: string) => {
    const item = data?.find(item => item.name === name);
    return item?.id || null;
  };

  const transformedInitialValues = React.useMemo(() => {
    if (!appointment) return {};
    const suppliersData = supplierQuery?.data?.data || [];
    const sublinesData = sublineQuery?.data?.data || [];
    const statusData = statusQuery?.data?.data || [];

    if (suppliersData.length === 0 || sublinesData.length === 0 || statusData.length === 0) {
      return {};
    }

    return {
      supplier: findIdByName(suppliersData, appointment.supplier_name),
      product_subline: findIdByName(sublinesData, appointment.product_subline_name),
      status: findIdByName(statusData, appointment.status_name),
      remarks: appointment.remarks,
      scheduled_delivery: appointment.scheduled_delivery
        ? dayjs(appointment.scheduled_delivery)
        : null,
      actual_delivery: appointment.actual_delivery
        ? dayjs(appointment.actual_delivery)
        : null,
    };
  }, [appointment, supplierQuery?.data, sublineQuery?.data, statusQuery?.data]);

  const handleFinish = (values: any) => {
    baseOnFinish({ ...values, id });
  };

  if (readLoading || supplierQuery?.isLoading || sublineQuery?.isLoading || statusQuery?.isLoading) {
    return <div>Cargando datos...</div>;
  }

  return (
    <Edit saveButtonProps={saveButtonProps} isLoading={formLoading}>
      <Form
        {...formProps}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={transformedInitialValues}
        key={JSON.stringify(transformedInitialValues)} 
      >
        <Title level={5}>ID</Title>
        <TextField value={appointment?.id ?? ""} />

        <Form.Item
          label="Proveedor"
          name="supplier"
          rules={[{ required: true, message: "Seleccione un proveedor" }]}
        >
          <Select {...supplierSelectProps} placeholder="Seleccione un proveedor" />
        </Form.Item>

        <Form.Item
          label="Sublínea"
          name="product_subline"
          rules={[{ required: true, message: "Seleccione una sublínea" }]}
        >
          <Select {...sublineSelectProps} placeholder="Seleccione una sublínea" />
        </Form.Item>

        <Form.Item
          label="Estado"
          name="status"
          rules={[{ required: true, message: "Seleccione el estado" }]}
        >
          <Select {...statusSelectProps} placeholder="Seleccione el estado" />
        </Form.Item>

        <Form.Item
          label="Fecha Programada"
          name="scheduled_delivery"
          rules={[{ required: true, message: "Ingrese la fecha programada" }]}
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

        {appointment?.created_at && (
          <>
            <Title level={5}>Creado</Title>
            <TextField value={appointment.created_at.split("T")[0]} />
          </>
        )}
      </Form>
    </Edit>
  );
};