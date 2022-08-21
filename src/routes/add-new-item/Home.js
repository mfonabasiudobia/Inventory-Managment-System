import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar, useGridApiContext, useGridApiRef, GridActionsCellItem   } from '@mui/x-data-grid';
import Layout from "../../layout";
import {  axios, toast } from "../../config/services";
import { useInventoryContext } from "../../ContextApi";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import { InputValidateEditComponent } from "../../components/inventory/EditComponent";
import { updateRow, deleteRow, addRow } from "../../helpers/request";
import EditToolbar  from  "../../components/inventory/EditToolbar";


const AddNewItem = () => {

  const [rows, setRows] = useState([]);
  const [editRowModel, setEditRowModel] = useState([]);
  const [editableRowId, setEditableRowId] = useState(0);
  const [refresh, setRefresh] = useState(true);
  const { contextData, setContextData, suppliers, categories, openLoader, closeLoader, filterBranch } = useInventoryContext();
  const apiRef = useGridApiRef();

const columns = [
   {
    field: 'sno',
    headerName: 'SNO',
    renderCell: (params) => params.id === 'new-column' ? '' : params.id
  },
  { field: 'id',
   headerName: 'ID',
   width: 90,
   hide : true
 },
  {
    field: 'barcode',
    headerName: 'Barcode',
    width: 150,
    editable: true,
    renderEditCell : (params : GridRenderEditCellParams) => <InputValidateEditComponent {...params} />
  },
  {
    field: 'supplier',
    headerName: 'Supplier',
    width: 150,
    editable: true,
    type : 'singleSelect',
    valueOptions : suppliers
  },
 {
    field: 'product_category',
    headerName: 'Category',
    width: 150,
    editable: true,
    type : 'singleSelect',
    valueOptions : categories
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 150,
    editable: true
  },
  {
    field: 'unit_per_case',
    headerName: 'Unit/Case',
    width: 150,
    editable: true,
    renderEditCell : (params : GridRenderEditCellParams) => <InputValidateEditComponent {...params} />
  },
  {
    field: 'quantity_pcs',
    headerName: 'Qty(Pcs)',
    width: 150,
    editable: true,
    renderEditCell : (params : GridRenderEditCellParams) => <InputValidateEditComponent {...params} />
  },
  {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            flex: 1,
            cellClassName: 'actions',
            getActions: (row) => {

                let newRow = row.row;
                let rows = [];


            if(newRow.id !== 'new-column' && newRow.id !== editableRowId)
                rows.push(<GridActionsCellItem icon={<EditIcon />} onClick={() => setEditableRowId(newRow.id)} />);

            if(newRow.id === 'new-column' || newRow.id === editableRowId)
                rows.push(<GridActionsCellItem icon={<SaveIcon />} 
                    onClick={() => newRow.id === 'new-column' ? saveNewOnClick(row.row) : saveOnClick(row.row)} />);

            if(newRow.id !== 'new-column' && newRow.id === editableRowId)
                rows.push(<GridActionsCellItem icon={<CancelIcon />} onClick={() => setEditableRowId(0)} />);

            if(newRow.id !== 'new-column' && newRow.id !== editableRowId)
                rows.push(<GridActionsCellItem icon={<DeleteIcon />} onClick={() => deleteOnClick(row.row)} />);

                return rows;
            }
        }
];



  const saveOnClick = async (row) => {
        try{
            openLoader();
            const res = await updateRow(editRowModel, 'user/add-new-item/' + Object.keys(editRowModel)[0]);
            toast("Row Updated successfully"); setRefresh(true); setEditableRowId(0);
        }catch({ data }){
            for (const key in data) { toast(data[key][0]); }
        }finally{
             closeLoader();
        }
}

const saveNewOnClick = async (row) => {
    try{
            openLoader();
            const res = await addRow(editRowModel, 'user/add-new-item');
            toast("Row Added successfully"); setRefresh(true); 
        }catch({ data }){
            for (const key in data) { toast(data[key][0]); }
        }finally{
             closeLoader();
        }
}

  const deleteOnClick = async (row) => {
    try{
            openLoader();
            const res = await deleteRow(editRowModel, 'user/add-new-item/' + row.id);
            setRows((prevRows) => prevRows.filter((item) => item.id !== row.id)); toast("Item has been deleted");
        }catch(err){
            toast("An error occured");
        }finally{
             closeLoader();
        }
}



  useEffect(() => {

         if(refresh){
           setContextData({...contextData, loading : true});
            axios.get("user/add-new-item")
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
    <section className="p-4 space-y-5">
          <div style={{ height: '80vh', width: '100%' }}>
            <DataGrid
              rows={filterBranch(rows).map((item, index) => Object.assign(item, { sno : index + 1}))}
              columns={columns.map((item) => Object.assign(item, { headerClassName : 'bg-green-500 text-white'}))}
              rowsPerPageOptions={[50, 100, 500, 1000]}
              disableColumnSelector
              disableDensitySelector
              apiRef={apiRef}
              components={{ Toolbar: EditToolbar }}
              componentsProps={{ toolbar: { 
                    apiRef, 
                    showQuickFilter: true,
                    quickFilterProps: { debounceMs: 500 },
               } 
             }}
              editRowModel={editRowModel}
              onEditRowsModelChange={setEditRowModel}
              editMode="row"
              disableSelectionOnClick
              isCellEditable={(params) => params.row.id === editableRowId || params.row.id === 'new-column'}
              checkboxSelection
            />
          </div>
      </section>
    </Layout>
  );
}


export default AddNewItem;
