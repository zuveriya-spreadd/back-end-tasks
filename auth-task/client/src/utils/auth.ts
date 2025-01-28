import { jwtDecode } from "jwt-decode";

export function getToken(): string | null {
  if (typeof window === "undefined") return null; 
  return localStorage.getItem("token");
}

export function setToken(token: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
  }
}

export function removeToken(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
  }
}

export function getUserFromToken(): any | null {
  const token = getToken();
  if (!token) return null;

  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Invalid Token", error);
    return null;
  }
}

export function isAuthenticated(): boolean {
  return !!getUserFromToken();
}
