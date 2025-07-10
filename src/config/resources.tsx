import {
  LayoutDashboard,
  CalendarCheck2,
  BarChart4,
} from "lucide-react";

export const resources = [
  {
    name: "dashboard",
    list: "/dashboard",
    meta: {
      icon: <LayoutDashboard />,
      label: "Dashboard",
    },
  },
  {
    name: "appointments-management",
    list: "/appointments-management",
    create: "/appointments-management/create",
    edit: "/appointments-management/edit/:id",
    show: "/appointments-management/show/:id",
    meta: {
      icon: <CalendarCheck2 />,
      label: "Citas",
      canDelete: true,
    },
  },
  {
    name: "reports",
    list: "/reports",
    create: "/reports/create",
    edit: "/reports/edit/:id",
    show: "/reports/show/:id",
    meta: {
      icon: <BarChart4 />,
      label: "Reportes",
      canDelete: true,
    },
  },
];
