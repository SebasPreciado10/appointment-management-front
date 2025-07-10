import { List, TextField, DateField, useSelect } from "@refinedev/antd";
import { BaseRecord, useList, useCreate } from "@refinedev/core";
import { Table, Select, Space, Typography, Button, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React, { useMemo, useState } from "react";

const { Option } = Select;
const { Title } = Typography;

export const ReportList = () => {
  const token = localStorage.getItem("access_token");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSublineId, setSelectedSublineId] = useState<string | undefined>();
  const [selectedSublineName, setSelectedSublineName] = useState<string | undefined>();
  const [filterSelectedSubline, setFilterSelectedSubline] = useState<string | undefined>();

  const { data, isLoading, refetch } = useList({
    resource: "reports/list/",
    hasPagination: false,
    meta: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    errorNotification: false, 
  });

  const { selectProps: sublineSelectProps, queryResult: sublineQuery } = useSelect({
    resource: "product-sublines/list/",
    optionLabel: "name",
    optionValue: "id",
    meta: { headers: { Authorization: `Bearer ${token}` } },
  });

  const { mutate: createReport, isLoading: isCreating } = useCreate({
    errorNotification: false, 
  });

  const dataSource = data?.data ?? [];

  const filteredData = useMemo(() => {
    if (!filterSelectedSubline) return dataSource;
    return dataSource.filter(
      (item) => item.product_subline_name === filterSelectedSubline
    );
  }, [dataSource, filterSelectedSubline]);

  const sublineOptions = useMemo(() => {
    const unique = new Set(dataSource.map((r) => r.product_subline_name));
    return Array.from(unique);
  }, [dataSource]);

  const handleCreateReport = () => {
    if (!selectedSublineId) {
      message.error("Por favor seleccione una sublínea");
      return;
    }

    createReport(
      {
        resource: "reports/create/",
        values: {
          product_subline: selectedSublineId,
        },
        meta: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      },
      {
        onSuccess: () => {
          message.success("Reporte creado exitosamente");
          setIsModalOpen(false);
          setSelectedSublineId(undefined);
          setSelectedSublineName(undefined);
          refetch();
        },
        onError: (error: any) => {
          if (error?.response?.status === 404 && error?.response?.data?.detail) {
            message.warning(error.response.data.detail); 
          } else {
            message.error("Error al crear el reporte");
          }
        },
      }
    );
  };

  const handleSublineChange = (value: string) => {
    setSelectedSublineId(value);
    const sublinesData = sublineQuery?.data?.data || [];
    const selectedSubline = sublinesData.find(item => item.id === value);
    setSelectedSublineName(selectedSubline?.name || "");
  };

  const sublinesReady = !sublineQuery?.isLoading && sublineQuery?.data?.data;

  return (
    <>
      <List
        headerButtons={({ defaultButtons }) => (
          <Space>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsModalOpen(true)}
            >
              Crear Reporte
            </Button>
          </Space>
        )}
      >
        {isLoading ? (
          <div>Loading...</div> 
        ) : dataSource.length === 0 ? (
          <div>No hay datos disponibles</div>
        ) : (
          <Table
            dataSource={filteredData}
            loading={isLoading}
            rowKey="id"
            pagination={false}
          >
            <Table.Column dataIndex="id" title="ID" />
            <Table.Column
              dataIndex="generated_at"
              title="Fecha de Generación"
              render={(value: string) => <DateField value={value} />}
            />
            <Table.Column
              dataIndex="average_delivery_time_decimal"
              title="Tiempo Prom. (Decimal)"
              render={(value: number) => <TextField value={`${value}h`} />}
            />
            <Table.Column
              dataIndex="average_delivery_time_readable"
              title="Tiempo Prom. (Legible)"
              render={(value: string) => <TextField value={value} />}
            />
            <Table.Column
              dataIndex="product_subline_name"
              title="Sub-línea"
              render={(value: string) => <TextField value={value} />}
            />
          </Table>
        )}
      </List>

      <Modal
        title="Crear Nuevo Reporte"
        open={isModalOpen}
        onOk={handleCreateReport}
        onCancel={() => {
          setIsModalOpen(false);
          setSelectedSublineId(undefined);
          setSelectedSublineName(undefined);
        }}
        confirmLoading={isCreating}
        okText="Crear Reporte"
        cancelText="Cancelar"
      >
        <div style={{ marginBottom: 16 }}>
          <Title level={5}>Seleccionar Sublínea:</Title>
          {sublinesReady ? (
            <Select
              style={{ width: "100%" }}
              placeholder="Seleccione una sublínea"
              onChange={handleSublineChange}
              value={selectedSublineId}
              loading={sublineQuery?.isLoading}
            >
              {sublineQuery?.data?.data?.map((subline: any) => (
                <Option key={subline.id} value={subline.id}>
                  {subline.name}
                </Option>
              ))}
            </Select>
          ) : (
            <Select
              style={{ width: "100%" }}
              placeholder="Cargando sublíneas..."
              loading={true}
              disabled
            />
          )}
        </div>
        
        {selectedSublineName && (
          <div style={{ marginTop: 16 }}>
            <p>
              ¿Está seguro de que desea crear un reporte para la sublínea{" "}
              <strong>{selectedSublineName}</strong>?
            </p>
          </div>
        )}
      </Modal>
    </>
  );
};
