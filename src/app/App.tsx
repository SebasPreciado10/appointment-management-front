import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { RefineContext } from "./refineContext";
import { Authenticated } from "@refinedev/core";
import {
  ThemedLayoutV2,
  ThemedSiderV2,
  ErrorComponent,
} from "@refinedev/antd";
import { Header } from "@/components/header";
import {
  NavigateToResource,
} from "@refinedev/react-router-v6";
import { Dashboard } from "@/pages/dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Login } from "@/pages/login";
import {
  AppointmentList,
  AppointmentCreate,
  AppointmentEdit,
  AppointmentShow,
} from "@/pages/appointment-management";
import { ReportList } from "@/pages/reports/list";

const queryClient = new QueryClient();

function App() {
  return (
    <RefineContext>
      <Routes>
        <Route
          index
          element={
            <Authenticated
              key="root"
              v3LegacyAuthProviderCompatible={true}
              fallback={<Navigate to="/login" />}
            >
              <NavigateToResource />
            </Authenticated>
          }
        />

        <Route path="/login" element={<Login />} />

        <Route
          element={
            <Authenticated
              key="auth"
              v3LegacyAuthProviderCompatible={true}
              fallback={<Navigate to="/login" />}
            >
              <ThemedLayoutV2
                Header={Header}
                Sider={(props) => <ThemedSiderV2 {...props} fixed />}
              >
                <Outlet />
              </ThemedLayoutV2>
            </Authenticated>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/appointments-management">
            <Route index element={<AppointmentList />} />
            <Route path="create" element={<AppointmentCreate />} />
            <Route path="edit/:id" element={<AppointmentEdit />} />
            <Route path="show/:id" element={<AppointmentShow />} />
          </Route>
          <Route path="/reports">
            <Route index element={<ReportList />} />
          </Route>
          
          <Route path="*" element={<ErrorComponent />} />
        </Route>
      </Routes>
    </RefineContext>
  );
}

export default App;
