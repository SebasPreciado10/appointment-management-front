import { Card, Col, Row, Typography } from "antd";
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveBar } from "@nivo/bar";
import { useList } from "@refinedev/core";
import React, { useMemo } from "react";

const { Title } = Typography;

export const Dashboard = () => {
  const token = localStorage.getItem("access_token");

  const { data, isLoading } = useList({
    resource: "appointments/list/",
    hasPagination: false,
    meta: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  const appointments = data?.data || [];
  const total = appointments.length;

  const statusCounts = useMemo(() => {
    return appointments.reduce<Record<string, number>>((acc, item) => {
      acc[item.status_name] = (acc[item.status_name] || 0) + 1;
      return acc;
    }, {});
  }, [appointments]);

  const supplierCounts = useMemo(() => {
    return appointments.reduce<Record<string, number>>((acc, item) => {
      acc[item.supplier_name] = (acc[item.supplier_name] || 0) + 1;
      return acc;
    }, {});
  }, [appointments]);

  const sublineCounts = useMemo(() => {
    return appointments.reduce<Record<string, number>>((acc, item) => {
      acc[item.product_subline_name] =
        (acc[item.product_subline_name] || 0) + 1;
      return acc;
    }, {});
  }, [appointments]);

  const pieStatusData = Object.entries(statusCounts).map(([status, value]) => ({
    id: status,
    label: status,
    value,
  }));

  const pieSupplierData = Object.entries(supplierCounts).map(
    ([supplier, value]) => ({
      id: supplier,
      label: supplier,
      value,
    })
  );

  const sublineBarData = Object.entries(sublineCounts).map(
    ([subline, count]) => ({
      categoria: subline,
      cantidad: count,
    })
  );

  return (
    <div style={{ padding: 24 }}>
      <Title level={3}>Dashboard - Resumen de Citas</Title>

      {/* Resumen total y por estado */}
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card loading={isLoading}>
            <Title level={5}>Resumen de Estados</Title>
            <p style={{ fontSize: 18 }}>
              Total de Citas: <strong>{total}</strong>
            </p>
            {Object.entries(statusCounts).map(([status, count]) => (
              <p key={status} style={{ margin: 0 }}>
                {status}: <strong>{count}</strong>
              </p>
            ))}
          </Card>
        </Col>
      </Row>

      {/* Gráficos tipo Pie */}
      <Row style={{ marginTop: 32 }} gutter={[16, 16]}>
        <Col span={12}>
          <Card title="Distribución por Estado" loading={isLoading}>
            <div style={{ height: 350 }}>
              <ResponsivePie
                data={pieStatusData}
                margin={{ top: 40, right: 20, bottom: 80, left: 20 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                activeOuterRadiusOffset={8}
                borderWidth={1}
                borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor="#333333"
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: "color" }}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor={{
                  from: "color",
                  modifiers: [["darker", 2]],
                }}
              />
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Distribución por Proveedor" loading={isLoading}>
            <div style={{ height: 350 }}>
              <ResponsivePie
                data={pieSupplierData}
                margin={{ top: 40, right: 20, bottom: 80, left: 20 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                activeOuterRadiusOffset={8}
                borderWidth={1}
                borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor="#333333"
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: "color" }}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor={{
                  from: "color",
                  modifiers: [["darker", 2]],
                }}
                colors={["#1f77b4", "#ff7f0e", "#2ca02c"]}
              />
            </div>
          </Card>
        </Col>
      </Row>

      {/* Gráfico de barras por sub-línea */}
      <Row style={{ marginTop: 32 }} gutter={[16, 16]}>
        <Col span={24}>
          <Card title="Citas por Sub-línea (Barras)" loading={isLoading}>
            <div style={{ height: 350 }}>
              <ResponsiveBar
                data={sublineBarData}
                keys={["cantidad"]}
                indexBy="categoria"
                margin={{ top: 40, right: 20, bottom: 50, left: 60 }}
                padding={0.3}
                layout="vertical"
                colors={{ scheme: "pastel1" }}
                axisBottom={{
                  legend: "Sub-línea",
                  legendPosition: "middle",
                  legendOffset: 40,
                }}
                axisLeft={{
                  legend: "Cantidad",
                  legendPosition: "middle",
                  legendOffset: -40,
                }}
              />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
