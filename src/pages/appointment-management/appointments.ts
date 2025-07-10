// src/constants/appointments.ts

import { BaseRecord } from "@refinedev/core";

export const supplierOptions = [
  { label: "Proveedor A", value: "8ecf1dc3-c879-4bb6-90ff-29c03acb6c07" },
  { label: "Proveedor B", value: "2b7a56e0-5d24-4a47-83cb-37dcce0e6f99" },
  { label: "Proveedor C", value: "b6b1c1a7-334d-4cfb-a1fd-147a8791e3f0" },
];

export const sublineOptions = [
  { label: "Camisetas", value: "4da62f08-85cc-4263-a9e6-4154a13f9393" },
  { label: "Pantalones", value: "bfb63b40-0f5c-4b04-b308-594fb10fcd6d" },
  { label: "Zapatos", value: "01c6793f-9618-489e-b1ba-6a3eaeff0c2e" },
  { label: "Accesorios", value: "e6a7f1cf-1e2a-466b-9a6d-c20c8f48eebb" },
];

export const statusOptions = [
  { label: "Programada", value: "e6a4a3e7-87f9-4601-a5d2-bcb46bd79c92" },
  { label: "En proceso", value: "aa6ae1b6-7f9d-493b-a408-3b9050897e32" },
  { label: "Entregada", value: "c5d6e199-176a-4a9c-9b1c-f0bb340debc0" },
  { label: "Cancelada", value: "81e8f20c-68a9-4cc7-bb8a-772b7fcd43f2" },
];

export const staticData: BaseRecord[] = [
  {
    id: "3a263f7b-3e5a-4073-bd78-fd3d60ffa3c1",
    scheduled_delivery: "2025-10-09T18:57:27.285000Z",
    actual_delivery: "2025-07-09T18:57:27.285000Z",
    remarks: "test 1",
    supplier_name: "Proveedor A",
    product_subline_name: "Pantalones",
    status_name: "Entregada",
    created_by_user: 3,
    created_at: "2025-07-09T19:00:26.221418Z",
    updated_at: "2025-07-09T19:00:26.221428Z",
  },
  {
    id: "a5116825-421a-42b0-b87e-a7fa62a6d47e",
    scheduled_delivery: "2025-08-09T18:57:27.285000Z",
    actual_delivery: "2025-07-09T18:57:27.285000Z",
    remarks: "test 1",
    supplier_name: "Proveedor A",
    product_subline_name: "Pantalones",
    status_name: "Entregada",
    created_by_user: 3,
    created_at: "2025-07-09T19:00:20.858954Z",
    updated_at: "2025-07-09T19:00:20.858965Z",
  },
  {
    id: "ed2b122f-3d51-4a27-a4ca-da105954de55",
    scheduled_delivery: "2025-07-09T18:57:27.285000Z",
    actual_delivery: "2025-07-09T18:57:27.285000Z",
    remarks: "test 1",
    supplier_name: "Proveedor A",
    product_subline_name: "Pantalones",
    status_name: "Entregada",
    created_by_user: 3,
    created_at: "2025-07-09T18:59:47.820394Z",
    updated_at: "2025-07-09T18:59:47.820406Z",
  },
  {
    id: "ed2b122f-3d51-4a27-a4ca-da105954de55",
    scheduled_delivery: "2025-07-09T18:57:27.285000Z",
    actual_delivery: "2025-07-09T18:57:27.285000Z",
    remarks: "test 1",
    supplier_name: "Proveedor B",
    product_subline_name: "Camisetas",
    status_name: "En Proceso",
    created_by_user: 3,
    created_at: "2025-07-09T18:59:47.820394Z",
    updated_at: "2025-07-09T18:59:47.820406Z",
  },
  {
    id: "ed2b122f-3d51-4a27-a4ca-da105954de55",
    scheduled_delivery: "2025-07-09T18:57:27.285000Z",
    actual_delivery: "2025-07-09T18:57:27.285000Z",
    remarks: "test 1",
    supplier_name: "Proveedor B",
    product_subline_name: "Camisetas",
    status_name: "En Proceso",
    created_by_user: 3,
    created_at: "2025-07-09T18:59:47.820394Z",
    updated_at: "2025-07-09T18:59:47.820406Z",
  },
  {
    id: "ed2b122f-3d51-4a27-a4ca-da105954de55",
    scheduled_delivery: "2025-07-09T18:57:27.285000Z",
    actual_delivery: "2025-07-09T18:57:27.285000Z",
    remarks: "test 1",
    supplier_name: "Proveedor C",
    product_subline_name: "Zapatos",
    status_name: "Cancelado",
    created_by_user: 3,
    created_at: "2025-07-09T18:59:47.820394Z",
    updated_at: "2025-07-09T18:59:47.820406Z",
  },
];
              