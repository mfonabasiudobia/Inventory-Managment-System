import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid';
import Layout from "../../layout";
import {  axios, routes, toast } from "../../config/services";
import { Link, useNavigate } from "react-router-dom";
import { useInventoryContext } from "../../ContextApi";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Home = () => {

  const [rows, setRows] = useState([]);
  const { contextData, setContextData } = useInventoryContext();
  const navigate = useNavigate();

const columns = [
  {
    field: 'sno',
    headerName: 'SNO'
  },
  { field: 'id',
   headerName: 'ID',
   hide : true
 },
  {
    field: 'first_name',
    headerName: 'First Name',
    flex: 1,
    editable: false,
  },
  {
    field: 'last_name',
    headerName: 'Last Name',
    flex: 1,
    editable: false
  },
  {
    field: 'email',
    headerName: 'Email',
    minWidth: 300,
    editable: false
  },
  {
    field: 'user_group',
    headerName: 'User Group',
    flex: 1,
    editable: false
  },
  {
    field: 'actions',
    type: 'actions',
    headerName: 'Actions',
    width: 100,
    cellClassName: 'actions',
    getActions: (row) => {
        return [
            <GridActionsCellItem
                icon={<EditIcon />}
                label="Edit"
                className="textPrimary"
                onClick={() => navigate(routes.users.edit + row.row.id, { state : row.row})}
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
        axios.delete("user/users/" + row.id)
            .then((res) => {
                 const {status} = res.data;
                 if(status === 'success')
                     toast("User has been deleted");
                    setRows((prevRows) => prevRows.filter((item) => item.id !== row.id));
            })
            .catch((e) => toast("Cannot delete this item"))
            .finally(() => setContextData({...contextData, loading : false}));

}


useEffect(() => {
           setContextData({...contextData, loading : true});
            axios.get("user/users")
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
            <Link
                    to={routes.users.create} 
                    class="text-green-500 bg-gray-50 p-2">
                    <i class="las la-plus"></i>
                    <span>Create User</span>
           </Link>

            <div style={{ height: '80vh', width: '100%' }}>
              <DataGrid
                rows={rows.map((item, index) => Object.assign(item, { sno : index + 1}))}
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


export default Home;
