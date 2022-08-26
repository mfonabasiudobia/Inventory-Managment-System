import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar, useGridApiContext, useGridApiRef, GridActionsCellItem   } from '@mui/x-data-grid';
import Layout from "../../layout";
import {  axios, toast, moment } from "../../config/services";
import { useInventoryContext } from "../../ContextApi";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import { InputValidateEditComponent, RenderExpiryDateAvailableColumn } from "../../components/inventory/EditComponent";
import { updateRow, deleteRow, addRow } from "../../helpers/request";
// import EditToolbar  from  "../../components/inventory/EditToolbar";
import InventoryLayout from "./layout";

const InventoryOut = () => {

  const [rows, setRows] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [editRowModel, setEditRowModel] = useState([]);
  const [editableRowId, setEditableRowId] = useState(0);
  const [refresh, setRefresh] = useState(true);
  const { contextData, setContextData, suppliers, categories, openLoader, closeLoader, filterBranch } = useInventoryContext();
  const apiRef = useGridApiRef();


const EditToolbar = (props) => {
    const apiRef = useGridApiContext();
    const [isClicked, setIsClicked] = useState(false);

    const handleAddNewRowClick = () => {
        const id = 'new-column';
        
        apiRef.current.updateRows([{ id, isNew: true }]);
        apiRef.current.setRowMode(id, 'edit');
            // Wait for the grid to render with the new row
            setTimeout(() => {
                setIsClicked(true)
                apiRef.current.scrollToIndexes({
                    rowIndex: apiRef.current.getRowsCount() - 1,
                });
                // apiRef.current.setCellFocus(id, field);
            });
    }

    useEffect(() => {
        let _ids = apiRef?.current.state.rows.ids;

        if (!_ids.includes('new-column')) {
            handleAddNewRowClick();
        }
    }, [apiRef?.current.state.rows.ids])

    return <GridToolbar showQuickFilter={true} quickFilterProps={{ debounceMs: 500 }} />;

}

EditToolbar.propTypes = {
    apiRef: PropTypes.shape({
        current: PropTypes.object.isRequired,
    }).isRequired,
};

const columns = [
   {
    field: 'sno',
    headerName: 'SNO',
  },
  { field: 'id',
   headerName: 'ID',
   width: 90,
   hide : true
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
    width: 150,
    editable: true
  },
 {
    field: 'expiry_date_available',
    headerName: 'Expiry Dates Available',
    width: 150,
    editable: false,
    cellClassName : 'text-red-900 font-bold',
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
    field: 'expiry_date_count',
    headerName: 'Expiry Date Count',
    width: 150,
    editable: false,
    cellClassName : 'text-red-900 font-bold',
  },
   {
    field: 'remaining_quantity_pcs',
    headerName: 'Remaining Qty (Pcs)',
    width: 150,
    editable: false,
    cellClassName : 'font-bold',
  },
   {
    field: 'remaining_quantity_box',
    headerName: 'Remaining Qty (Box)',
    width: 150,
    editable: false,
    cellClassName : 'font-bold',
  },
 {
    field: 'remaining_total_quantity_pcs',
    headerName: 'Remaining Total Qty (Pcs)',
    width: 150,
    editable: false,
    cellClassName : 'font-bold',
  },
  {
    field: 'remaining_total_quantity_box',
    headerName: 'Remaining Total Qty (Box)',
    width: 150,
    editable: false,
    cellClassName : 'font-bold',
  },
 {
    field: 'expiry_date_match',
    headerName: 'Expiry Date Match',
    width: 150,
    editable: false
  },
  {
    field: 'nearest_expiry_date',
    headerName: 'Nearest Expiry Date',
    width: 150,
    editable: false
  },
 {
    field: 'unit_per_case',
    headerName: 'Unit/Case',
    width: 100,
    editable: false,
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
    field: 'return',
    headerName: 'Return',
    width: 150,
    editable: false,
    renderCell : ({ row }) => <input type="checkbox" checked={row.return == 1 ? true : false} />,
  },
 {
    field: 'warehouse',
    headerName: contextData.currentBranchId == 2 || contextData.currentBranchId == 0  ? 'Wholesale' : 'Mtayleb',
    width: 150,
    editable: false,
    renderCell : ({ row }) => <input type="checkbox" checked={row.warehouse == 1 ? true : false} />,
  },
   {
    field: 'notes',
    headerName: "Notes",
    width: 150,
    editable: true,
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
            
            Promise.all([
              axios.get(`user/inventory/out`),
              axios.get(`user/inventory`),
            ]).then((res) => {
                
                   if(res.data.status === 'success'){
                        setRows(res[0].data.data);
                        setInventory(res[1].data.data);
                   }
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
      <InventoryLayout>
        <section className="p-4 space-y-5">
              <div style={{ height: '80vh', width: '100%' }}>
                <DataGrid
                  rows={filterBranch(rows).map((item, index) => Object.assign(item, { sno : index + 1}))}
                  columns={columns.map((item) => Object.assign(item, { headerClassName : 'bg-blue-darker text-white break-words whitespace-normal'}))}
                  getRowClassName={(params) => params.indexRelativeToCurrentPage % 2 === 0 ? 'text-black bg-blue-dark' : 'text-black bg-blue-light'}
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
      </InventoryLayout>
    </Layout>
  );
}


export default InventoryOut;
