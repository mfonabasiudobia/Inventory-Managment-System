import './App.css';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./routes/Login";
import InventoryHome from "./routes/inventory/Home";
import Suppliers from "./routes/suppliers/Home";
import ErrorLog from "./routes/logs/Home";
import Categories from "./routes/categories/Home";
import Notification from "./routes/notifications/Home";
import { ContextProvider } from "./ContextApi";
import Loading from "./components/Loading";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "flatpickr/dist/themes/material_green.css";
import { routes } from "./config/services";

import Type1 from "./routes/reports/Type1";
import Type2 from "./routes/reports/Type2";
import Type3 from "./routes/reports/Type3";
import Type4 from "./routes/reports/Type4";
import Type5 from "./routes/reports/Type5";
import Type6 from "./routes/reports/Type6";
import Type7 from "./routes/reports/Type7";
import Type8 from "./routes/reports/Type8";
import Type9 from "./routes/reports/Type9";
import Type10 from "./routes/reports/Type10";

import UsersHome from "./routes/users/Home";
import UsersCreate from "./routes/users/Create";
import UsersEdit from "./routes/users/Edit";

const theme = createTheme({
    typography : {
      button : {
        textTransform : 'none'
      }
    }
  });

function App() {
  return (
    <ContextProvider>
      <ToastContainer />
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
              <Route path="/inventory" >
                  <Route index element={<InventoryHome />} />
              </Route>

            <Route path={routes.suppliers} element={<Suppliers />} />
            <Route path={routes.categories} element={<Categories />} />
            <Route path={routes.logs} element={<ErrorLog />} />
            <Route path={routes.notifications} element={<Notification />} />

            <Route path="/reports" >
                  <Route index  path="type1" element={<Type1 />} />
                  <Route path="type2" element={<Type2 />} />
                  <Route path="type3" element={<Type3 />} />
                  <Route path="type4" element={<Type4 />} />
                  <Route path="type5" element={<Type5 />} />
                  <Route path="type6" element={<Type6 />} />
                  <Route path="type7" element={<Type7 />} />
                  <Route path="type8" element={<Type8 />} />
                  <Route path="type9" element={<Type9 />} />
                  <Route path="type10" element={<Type10 />} />
            </Route>

            <Route path="/users" >
                  <Route index element={<UsersHome />} />
                  <Route path="create" element={<UsersCreate />} />
                  <Route path="edit/:id" element={<UsersEdit />} />
            </Route>

            
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
      <Loading />
    </ContextProvider>
  );
}

export default App;
