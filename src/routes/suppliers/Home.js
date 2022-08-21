import React, { useState, useEffect, useRef, useMemo } from 'react';
import { DataGrid, GridToolbar, useGridApiContext, useGridApiRef, GridActionsCellItem   } from '@mui/x-data-grid';
import Layout from "../../layout";
import {  axios, toast } from "../../config/services";
import { useInventoryContext } from "../../ContextApi";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddModal from "./modal/Add";
import EditModal from "./modal/Edit";

const Suppliers = () => {

  const [rows, setRows] = useState([]);
  const [toggleAddModal, setToggleAddModal] = useState(false);
  const [toggleEditModal, setToggleEditModal] = useState(false);
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
    field: 'number',
    headerName: 'Number',
    width: 150,
    editable: true,
  },
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
    editable: true
  },
  {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            flex: 1,
            cellClassName: 'actions',
            getActions: (row) => {
                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={() => {
                          setToggleEditModal(!toggleEditModal)
                          setContextData({...contextData, data : row.row});
                        }}
                        color="inherit"
                    />,

                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        className="textPrimary"
                        onClick={() => deleteUser(row.row)}
                        color="inherit"
                    />
                ];
            }
        }
];


  const deleteUser = (row) => {

       setContextData({...contextData, loading : true});
        axios.delete("user/suppliers/" + row.id)
            .then((res) => {
                 const {status} = res.data;
                 if(status === 'success')
                     toast("Item has been deleted");
                    setRows((prevRows) => prevRows.filter((item) => item.id !== row.id));
            })
            .catch((e) => toast("Cannot delete this item"))
            .finally(() => setContextData({...contextData, loading : false}));

}



  useEffect(() => {

         if(refresh){
           setContextData({...contextData, loading : true});
            axios.get("user/suppliers")
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
    <AddModal 
      status={toggleAddModal} 
      toggleAddModal={() => setToggleAddModal(!toggleAddModal)} 
      toggleRefresh={() => setRefresh(true)} />

    <EditModal 
      status={toggleEditModal} 
      toggleEditModal={() => setToggleEditModal(!toggleEditModal)} 
      toggleRefresh={() => setRefresh(true)} />

    <section className="p-4 space-y-5">
           <button className="hover:text-green-500 bg-gray-50 p-2" onClick={() => setToggleAddModal(!toggleAddModal)}>
                    <i className="las la-plus"></i>
                    <span>ADD</span>
            </button>

      <div style={{ height: '80vh', width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns.map((item) => Object.assign(item, { headerClassName : 'bg-green-500 text-white'}))}
          rowsPerPageOptions={[50, 100, 500, 1000]}
          disableColumnSelector
          disableDensitySelector
          components={{ Toolbar: GridToolbar }}
          componentsProps={{ toolbar: { 
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
           } 
         }}
          disableSelectionOnClick
          checkboxSelection
        />
      </div>

      </section>

    </Layout>
  );
}


export default Suppliers;
