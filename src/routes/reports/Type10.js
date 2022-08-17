import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar   } from '@mui/x-data-grid';
import Layout from "../../layout";
import ReportLayout from "./layout";
import {  axios } from "../../config/services";
import { useInventoryContext } from "../../ContextApi";


const Type10 = () => {

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
    minWidth: 150,
    editable: false,
  },
  {
    field: 'product_category',
    headerName: 'Category',
    minWidth: 150,
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
    minWidth: 150,
    editable: false
  },
  {
    field: 'status_formatted',
    headerName: 'Status',
    minWidth: 150,
    editable: false
  },
  {
    field: 'total_quantity_pcs_formatted',
    headerName: 'Total Qty(pcs)',
    minWidth: 150,
    editable: false
  },
  {
    field: 'total_quantity_box_formatted',
    headerName: 'Total Qty(box)',
    minWidth: 150,
    editable: false
  },
  {
    field: 'total_quantity_pcs',
    headerName: 'Total Qty(pcs)',
    minWidth: 150,
    editable: false
  },

  {
    field: 'quantity_pcs_m',
    headerName: 'Qty-M(pcs)',
    minWidth: 150,
    editable: false
  },
  {
    field: 'quantity_box_m_formatted',
    headerName: 'Qty-M(box)',
    minWidth: 150,
    cellClassName: 'font-bold',
    editable: false
  },
  {
    field: 'quantity_pcs_z',
    headerName: 'Qty-Z(pcs)',
    minWidth: 150,
    cellClassName: 'font-bold',
    editable: false
  },
  {
    field: 'quantity_box_z_formatted',
    headerName: 'Qty-Z(box)',
    minWidth: 150,
    cellClassName: 'font-bold',
    editable: false
  }
];

  useEffect(() => {
           setContextData({...contextData, loading : true});
            axios.get("user/reports/type10")
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


export default Type10;
