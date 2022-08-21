import React, { useState, useEffect } from 'react';
import { DataGrid, GridActionsCellItem, GridToolbar   } from '@mui/x-data-grid';
import Layout from "../../layout";
import {  axios, toast } from "../../config/services";
import { useInventoryContext } from "../../ContextApi";
import { Switch } from '@mui/material';


const Settings = () => {

  const [rows, setRows] = useState([]);
  const [refresh, setRefresh] = useState(true);
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
    field: 'title',
    headerName: 'Title',
    width: 150,
    editable: false
  },
  {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            flex: 1,
            getActions: (row) => {
                return [<Switch checked={row.row.value == 0 ? false : true} onChange={(e) => handleChange(e, row.row.id)} />];
            }
        }
];

const handleChange = (e, id) => {
        setContextData({...contextData, loading : true});
        axios({
                url: "user/settings/" + id,
                method: 'PUT',
                data : {
                  value : e.target.checked
                }
            })
            .then((res) => {
                 const {status} = res.data;
                 if(status === 'success')
                     toast("Item has been updated");
                  setRefresh(true);
            })
            .catch((e) => toast("Cannot Edit this item"))
            .finally(() => setContextData({...contextData, loading : false}));


}



  useEffect(() => {

         if(refresh){
           setContextData({...contextData, loading : true});
            axios.get("user/settings")
            .then((res) => {
                   const {status, data } = res.data;
                   if(status === 'success') setRows(data);
              })
              .catch(console.log)
              .finally(() => {
                setRefresh(false);
                setContextData({...contextData, loading : false})
              })
          }          

  },[refresh])


  return (
    <Layout>
   
    <section class="p-4 space-y-5">
      
      <h1 class='title'>Inventory Configuration</h1>

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


export default Settings;
