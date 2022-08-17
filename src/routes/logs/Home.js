import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar   } from '@mui/x-data-grid';
import Layout from "../../layout";
import {  axios } from "../../config/services";
import { useInventoryContext } from "../../ContextApi";

const ErrorLog = () => {

  const [rows, setRows] = useState([]);
  const { contextData, setContextData } = useInventoryContext();

const columns = [
   {
    field: 'sno',
    headerName: 'SNO',
    renderCell: (params) => params.id
  },
  { field: 'id',
   headerName: 'ID',
   width: 90,
   hide : true
 },
  {
    field: 'created_at',
    headerName: 'Name',
    width: 150,
    editable: false,
  },
  {
    field: 'updated_at',
    headerName: 'Created At',
    flex: 1,
    editable: false
  }
];



  useEffect(() => {

           setContextData({...contextData, loading : true});
            axios.get("user/error-log")
            .then((res) => {
                   const {status, data } = res.data;
                   if(status === 'success') setRows(data);
              })
              .catch(console.log)
              .finally(() => setContextData({...contextData, loading : false}))
                  
  },[])


  return (
    <Layout>
        <section class="p-4 space-y-5">
          <div style={{ height: '80vh', width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns.map((item) => Object.assign(item, { headerClassName : 'bg-green-500 text-white'}))}
              rowsPerPageOptions={[50, 100, 500, 1000]}
              components={{ Toolbar: GridToolbar }}
              disableColumnSelector
              disableDensitySelector
              componentsProps={{
                toolbar: {
                  showQuickFilter: true,
                  quickFilterProps: { debounceMs: 500 },
                },
              }}
              checkboxSelection
            />
          </div>
      </section>
    </Layout>
  );
}


export default ErrorLog;
