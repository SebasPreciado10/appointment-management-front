import { DateField, TextField } from "@refinedev/antd";
import { Typography, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons"; // Importar el ícono de flecha hacia atrás
import React from "react";
import { useParams, useNavigate } from "react-router-dom"; // useNavigate para la navegación
import { useOne } from "@refinedev/core";

const { Title } = Typography;

export const AppointmentShow = () => {
  const { id } = useParams();
  const token = localStorage.getItem("access_token");
  const navigate = useNavigate(); // Hook de navegación

  const { data, isLoading } = useOne({
    resource: "appointments/read", 
    id: `${id}/`,
    meta: {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
    queryOptions: {
      queryKey: ["appointments", id],
    },
  });

  const record = data?.data;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Botón para volver a la lista */}
      <Button 
        type="link" 
        onClick={() => navigate("/appointments-management")} // Navegar a la lista de citas
        icon={<ArrowLeftOutlined />} // Ícono de flecha hacia atrás
        style={{ marginBottom: 20 }}
      >
        Volver a la lista
      </Button>

      <Title level={5}>ID</Title>
      <TextField value={record?.id} />

      <Title level={5}>Proveedor</Title>
      <TextField value={record?.supplier_name} />

      <Title level={5}>Sublínea</Title>
      <TextField value={record?.product_subline_name} />

      <Title level={5}>Estado</Title>
      <TextField value={record?.status_name} />

      <Title level={5}>Fecha Programada</Title>
      <DateField value={record?.scheduled_delivery} />

      <Title level={5}>Fecha Real</Title>
      {record?.actual_delivery ? (
        <DateField value={record?.actual_delivery} />
      ) : (
        <TextField value="—" />
      )}

      <Title level={5}>Observaciones</Title>
      <TextField value={record?.remarks || "—"} />

      <Title level={5}>Creado por</Title>
      <TextField value={`Usuario ${record?.created_by_user || "—"}`} />

      <Title level={5}>Fecha de creación</Title>
      <DateField value={record?.created_at} />

      <Title level={5}>Última modificación</Title>
      <DateField value={record?.updated_at} />
    </div>
  );
};
