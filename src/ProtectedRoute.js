import React, { useState, useEffect } from "react";
import { Outlet, Navigate, useNavigate } from 'react-router-dom'
import { useInventoryContext } from "./ContextApi";
import { routes, axios, Cookie } from "./config/services";

export const ProtectedRoute = (props : any) => {

 const { contextData, setContextData } = useInventoryContext();
 const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => axios.get("user/auth/is-authenticated").then((res) => setIsLoggedIn(true)).catch((err) => setIsLoggedIn(false)), [])

  if (!isLoggedIn) return <div></div>
  else if (isLoggedIn) return <Outlet />
  else return <Navigate to={{ pathname: '/' }} />
}


