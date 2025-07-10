import { DateField, DeleteButton, List, TextField } from "@refinedev/antd";
import { BaseRecord, useList, useNavigation, useGo } from "@refinedev/core";
import { Button, Space, Table, Tag } from "antd";
import React from "react";

export const AppointmentList = () => {
  const token = localStorage.getItem("access_token");
  const { editUrl, showUrl } = useNavigation();
  const go = useGo();

  const { data, isLoading } = useList({
    resource: "appointments/list/",
    hasPagination: false,
    meta: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  const dataSource = data?.data ?? [];

  return (
    <List>
      <Table
        dataSource={dataSource}
        loading={isLoading}
        rowKey="id"
        pagination={false}
      >
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column
          dataIndex="supplier_name"
          title="Proveedor"
          render={(value: string) => <TextField value={value} />}
        />
        <Table.Column
          dataIndex="product_subline_name"
          title="Sublínea"
          render={(value: string) => <TextField value={value} />}
        />
        <Table.Column
          dataIndex="created_by_user"
          title="Creado por"
          render={(value: number) => <TextField value={`Usuario ${value}`} />}
        />
        <Table.Column
          dataIndex="scheduled_delivery"
          title="Fecha Programada"
          render={(value: string) => <DateField value={value} />}
        />
        <Table.Column
          dataIndex="actual_delivery"
          title="Fecha Real"
          render={(value: string) =>
            value ? <DateField value={value} /> : <TextField value="—" />
          }
        />
        <Table.Column
          dataIndex="status_name"
          title="Estado"
          render={(value: string) => {
            const colorMap: Record<string, string> = {
              Programada: "blue",
              "En proceso": "gold",
              Entregada: "green",
              Cancelada: "red",
            };
            return <Tag color={colorMap[value] || "default"}>{value}</Tag>;
          }}
        />
        <Table.Column
          title="Acciones"
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <Button
                size="small"
                type="link"
                disabled={!record.id}
                onClick={() => {
                  if (!record.id) return;
                  go({
                    to: showUrl("appointments-management", record.id),
                    type: "replace",
                  });
                }}
              >
                Ver
              </Button>

              <Button
                size="small"
                type="link"
                disabled={!record.id}
                onClick={() => {
                  if (!record.id) return;
                  go({
                    to: editUrl("appointments-management", record.id),
                    type: "replace",
                  });
                }}
              >
                Editar
              </Button>
              <DeleteButton
                hideText
                size="small"
                resource="appointments/delete"
                recordItemId={`${record.id}/`} 
                meta={{
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }}
              />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
