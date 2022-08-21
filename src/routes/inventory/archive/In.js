import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar, useGridApiContext, useGridApiRef, GridActionsCellItem   } from '@mui/x-data-grid';
import Layout from "../../../layout";
import ArchiveLayout from "./layout";
import {  axios, moment, toast } from "../../../config/services";
import { useInventoryContext } from "../../../ContextApi";
import { InputValidateEditComponent, RenderExpiryDateAvailableColumn } from "../../../components/inventory/EditComponent";
import EditToolbar  from  "../../../components/inventory/EditToolbar";
import { updateRow, deleteRow, addRow } from "../../../helpers/request";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';


const InventoryArchiveIn = () => {

  const [rows, setRows] = useState([]);
  const [editRowModel, setEditRowModel] = useState([]);
  const [editableRowId, setEditableRowId] = useState(0);
  const [refresh, setRefresh] = useState(true);
  const { contextData, setContextData, suppliers, categories, openLoader, closeLoader, filterBranch } = useInventoryContext();

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
    field: 'email',
    headerName: 'User',
    width: 150,
    editable: false,
  },
   {
    field: 'created_at',
    headerName: 'Date | Time',
    width: 150,
    editable: false,
    renderCell : ({ row }) => moment(row.created_at).format("DD-MM-YY HH:mm")
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
    field: 'product_type',
    headerName: 'Type',
    width: 150,
    editable: true,
    type : 'singleSelect',
    valueOptions : contextData.product_type
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
    minWidth: 300,
    editable: true,
  },
  {
    field: 'expiry_date',
    headerName: 'Expiry Date',
    width: 150,
    editable: true,
    renderCell: ({ row }) => row.expiry_date == "-" ? "-" : moment(row.expiry_date).format("MM-YY"),
    renderEditCell : (params : GridRenderEditCellParams) => <RenderExpiryDateAvailableColumn {...params} />
  },
 {
    field: 'unit_per_case',
    headerName: 'Unit/Case',
    width: 100,
    editable: true,
    cellClassName : 'italic',
    renderEditCell : (params : GridRenderEditCellParams) => <InputValidateEditComponent {...params} />
  },
  {
    field: 'quantity_pcs',
    headerName: 'Qty(Pcs)',
    width: 100,
    editable: true,
    cellClassName : 'font-bold',
    renderEditCell : (params : GridRenderEditCellParams) => <InputValidateEditComponent {...params} />
  },
  {
    field: 'warehouse',
    headerName: contextData.currentBranchId == 2 || contextData.currentBranchId == 0  ? 'Showroom' : 'Mtayleb',
    width: 150,
    editable: false,
    renderCell : ({ row }) => <input type="checkbox" checked={row.warehouse == 1 ? true : false} />,
  },
  {
    field: 'actions',
    type: 'actions',
    headerName: 'Actions',
    width: 150,
    cellClassName: 'actions',
    getActions: (row) => {

          let newRow = row.row;
          let rows = [];
          if(newRow.id !== editableRowId)
              rows.push(<GridActionsCellItem icon={<EditIcon />} onClick={() => setEditableRowId(newRow.id)} />);
          if(newRow.id === editableRowId)
              rows.push(<GridActionsCellItem icon={<SaveIcon />} onClick={() =>saveOnClick(row.row)} />);
          if(newRow.id === editableRowId)
              rows.push(<GridActionsCellItem icon={<CancelIcon />} onClick={() => setEditableRowId(0)} />);

            if(newRow.id !== editableRowId)
                rows.push(<GridActionsCellItem icon={<DeleteIcon />} onClick={() => deleteOnClick(row.row)} />);

                return rows;
            }
        }
];




  const saveOnClick = async (row) => {
        try{
            openLoader();
            const res = await updateRow(editRowModel, 'user/inventory/update-archive/' + Object.keys(editRowModel)[0]);
            toast("Row Updated successfully"); 
            setEditableRowId(0)
            setRefresh(true); 
        }catch({ data }){
            for (const key in data) { toast(data[key][0]); }
        }finally{
             closeLoader();
        }
}


  const deleteOnClick = async (row) => {
    try{
            openLoader();
            const res = await deleteRow(editRowModel, 'user/inventory/delete-archive/' + row.id);
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
            axios.get("user/inventory/archive-in")
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
    <ArchiveLayout>
        <section class="p-4 space-y-5">
          <div style={{ height: '95vh', width: '100%' }}>
            <DataGrid
              rows={filterBranch(rows).map((item, index) => Object.assign(item, { sno : index + 1}))}
              columns={columns.map((item) => Object.assign(item, { headerClassName : 'bg-black text-white'}))}
              rowsPerPageOptions={[50, 100, 500, 1000]}
              components={{ Toolbar: GridToolbar }}
              disableColumnSelector
              disableDensitySelector
              componentsProps={{ toolbar: { 
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
      </ArchiveLayout>
    </Layout>
  );
}


export default InventoryArchiveIn;
