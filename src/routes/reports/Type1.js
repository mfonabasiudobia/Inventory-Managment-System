import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Layout from "../../layout";
import ReportLayout from "./layout";
import {  axios } from "../../config/services";
import { useInventoryContext } from "../../ContextApi";

const Type1 = () => {

  const [rows, setRows] = useState([]);
  const { contextData, setContextData } = useInventoryContext();

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
    field: 'supplier',
    headerName: 'Supplier',
    flex: 1,
    editable: false,
  },
  {
    field: 'product_category',
    headerName: 'Category',
    flex: 1,
    editable: false
  },
  {
    field: 'description',
    headerName: 'Description',
    minWidth: 300,
    editable: false
  },
  {
    field: 'expiry_date',
    headerName: 'Expiry Date',
    flex: 1,
    editable: false
  },
  {
    field: 'unit_per_case',
    headerName: 'Unit Per Case',
    flex: 1,
    cellClassName: 'italic',
    editable: false
  },
  {
    field: 'quantity_pcs',
    headerName: 'Qty(Pcs)',
    flex: 1,
    cellClassName: 'font-bold',
    editable: false
  },
  {
    field: 'quantity_box',
    headerName: 'Qty(Box)',
    flex: 1,
    cellClassName: 'font-bold',
    editable: false
  }
];



  useEffect(() => {

           setContextData({...contextData, loading : true});
            axios.get("user/reports/type1")
            .then((res) => {
                   const {status, data } = res.data;
                   if(status === 'success') setRows(data);
              })
              .catch(console.log)
              .finally(() => setContextData({...contextData, loading : false}))        

  },[])


  return (
    <Layout>
    <ReportLayout>
        <section class="p-4 space-y-5">
          <div style={{ height: '95vh', width: '100%' }}>
            <DataGrid
              rows={rows.map((item, index) => Object.assign(item, { sno : index + 1}))}
              columns={columns.map((item) => Object.assign(item, { headerClassName : 'bg-black text-white'}))}
              rowsPerPageOptions={[50, 100, 500, 1000]}
              getRowClassName={(params) => params.indexRelativeToCurrentPage % 2 === 0 ? 'text-black bg-green-dark' : 'text-black bg-green-light'}
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
      </ReportLayout>
    </Layout>
  );
}


export default Type1;
