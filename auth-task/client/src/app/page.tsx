"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Login from "../pages/login";
import Register from "../pages/register";
import Dashboard from "../pages/dashboard";

const AppRoutes = () => {
  const pathname = usePathname();

  if (pathname === "/login") return <Login />;
  if (pathname === "/dashboard") return <Dashboard />;
  return <Register />;
};

export default AppRoutes;
