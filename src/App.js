import './App.css';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./routes/Login";
import InventoryHome from "./routes/inventory/Home";
import Suppliers from "./routes/suppliers/Home";
import Categories from "./routes/categories/Home";
import { ContextProvider } from "./ContextApi";
import Loading from "./components/Loading";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/categories" element={<Categories />} />

            
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
      <Loading />
    </ContextProvider>
  );
}

export default App;
