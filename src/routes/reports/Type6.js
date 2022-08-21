import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar   } from '@mui/x-data-grid';
import Layout from "../../layout";
import ReportLayout from "./layout";
import {  yup, yupResolver, useForm, axios, moment } from "../../config/services";
import { TextField, Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@mui/material';
import { useInventoryContext } from "../../ContextApi";

 const schema = yup.object().shape({
          number : yup.string().required(),
          product_type : yup.string().required(),
  })

const Type6 = () => {

  const [rows, setRows] = useState([]);
  const { contextData, setContextData } = useInventoryContext();

const { register, handleSubmit, setError, reset, formState: { errors } } = useForm({
  resolver : yupResolver(schema)
 });

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
    field: 'barcode',
    headerName: 'Barcode',
    flex: 1,
    editable: false,
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
    editable: false,
    renderCell: ({ row }) => row.expiry_date == "-" ? "-" : moment(row.expiry_date).format("MM-YY"),
  },
  {
    field: 'quantity_pcs',
    headerName: 'Qty(Pcs)',
    flex: 1,
    cellClassName: 'font-bold',
    editable: false
  }
];


  const handleForm = async (data, e) => {

        setContextData({...contextData, loading : true});
        axios.get("user/reports/type6", { params : data })
            .then((res) => {
                 const {status, data } = res.data;
                    if(status === 'success') setRows(data);
            })
            .catch((e) => {
                const { data } = e.response.data;
                for (const key in data) {
                    setError(key, {type : 'custom', message : data[key] });
                }
            })
            .finally(() => setContextData({...contextData, loading : false}));

    }



  return (
    <Layout>
    <ReportLayout>
        <section class="p-4 space-y-5">

         <form class="grid grid-cols-3 gap-5 my-3" onSubmit={handleSubmit(handleForm)}>
                <TextField 
                            error={errors.number} 
                            {...register('number')}
                            label="Enter Number"
                            variant="outlined" 
                            helperText={errors.number?.message}
                            type="text" 
                            fullWidth  
                        />

                <FormControl class="form-group">
                 <InputLabel>Enter Product Type</InputLabel>
                    <Select {...register('product_type')} fullWidth label="Enter Product Type">
                        <MenuItem value="food">Food</MenuItem>
                        <MenuItem value="non-food">Non Food</MenuItem>
                    </Select>
                    <FormHelperText>{errors.product_type?.message}</FormHelperText>
                </FormControl>

                <div class="form-group">
                    <button type="submit" class="btn bg-green-500 text-white p-3">Search</button>
                </div>

            </form>

          <div style={{ height: '85vh', width: '100%' }}>
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


export default Type6;
