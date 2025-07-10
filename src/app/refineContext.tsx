import React, { PropsWithChildren } from "react";
import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { useNotificationProvider } from "@refinedev/antd";
import { BrowserRouter } from "react-router-dom";
import { authProvider } from "@/providers/authProvider";
import { resources } from "@/config/resources";

type RefineContextProps = PropsWithChildren;

export const RefineContext: React.FC<RefineContextProps> = ({ children }) => {
    return (
        <BrowserRouter>
            <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider(import.meta.env.VITE_API_URL)}
                authProvider={authProvider}
                notificationProvider={useNotificationProvider}
                resources={resources}
                options={{
                    syncWithLocation: true,
                    warnWhenUnsavedChanges: true,
                    useNewQueryKeys: true,
                    title: { text: "Appointment Management", icon: "" },
                }}
            >
                {children}
            </Refine>
        </BrowserRouter>
    );
};