import { AuthProvider } from "@refinedev/core";


export const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    try {
      const response = await fetch("http://localhost:8000/auth/jwt/jwt/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.access && data.refresh) {
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);

        return {
          success: true,
          redirectTo: "/",
        };
      }

      return {
        success: false,
        error: {
          name: "Login Error",
          message: data?.detail || "Credenciales inválidas",
        },
      };
    } catch (error) {
      return {
        success: false,
        error: {
          name: "Login Error",
          message: "Ocurrió un error en el servidor",
        },
      };
    }
  },

  logout: async () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    return {
      success: true,
      redirectTo: "/login",
    };
  },

  check: async () => {
    const token = localStorage.getItem("access_token");
    if (token) {
      return { authenticated: true };
    }
    return { authenticated: false, redirectTo: "/login" };
  },

  getPermissions: async () => null,
  getIdentity: async () => null,
  onError: async () => ({ logout: false }),
};
