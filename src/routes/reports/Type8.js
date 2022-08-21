import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar   } from '@mui/x-data-grid';
import Layout from "../../layout";
import ReportLayout from "./layout";
import {  yup, yupResolver, useForm, axios, dateConfig, moment } from "../../config/services";
import { TextField, Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@mui/material';
import { useInventoryContext } from "../../ContextApi";
import Flatpickr from "react-flatpickr";

 const schema = yup.object().shape({
          date : yup.string().required(),
          barcode : yup.string(),
          description : yup.string(),
          expiry_date : yup.string(),
  })


const Type8 = () => {

  const [rows, setRows] = useState([]);
  const [statistics, setStatistics] = useState([]);
  const { contextData, setContextData, filterBranch } = useInventoryContext();

const { register, handleSubmit, setError, reset, setValue, formState: { errors } } = useForm({
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
    field: 'total_quantity_pc',
    headerName: 'Qty(Pcs)',
    flex: 1,
    cellClassName: 'font-bold',
    editable: false
  },
  {
    field: 'total_quantity_box',
    headerName: 'Qty(Box)',
    flex: 1,
    cellClassName: 'font-bold',
    editable: false
  }
];

  
  const handleForm = async (data, e) => {
        setContextData({...contextData, loading : true});
        axios.get("user/reports/type8", { params : data })
            .then((res) => {

                 const {status, data } = res.data;

                    if(status === 'success') {
                      setStatistics(data.statistics);
                      setRows(data.data);
                    }
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

         <form class="grid grid-cols-5 gap-5 my-3" onSubmit={handleSubmit(handleForm)}>

               <Flatpickr
                    data-input
                    placeholder="Date"
                    options={{...dateConfig, mode: "range" }}
                    onChange={(dates, dateStr, instance) => setValue('date', dateStr)}
                  />

                <TextField error={errors.barcode} {...register('barcode')}
                  label="Barcode" variant="outlined" helperText={errors.barcode?.message}
                  type="text" fullWidth  />

                <TextField error={errors.description} {...register('description')}
                  label="Description" variant="outlined" helperText={errors.description?.message}
                  type="text" fullWidth  />

                <Flatpickr
                    data-input
                    placeholder="Expiry Date"
                    options={{...dateConfig, dateFormat : 'm-y', altFormat : 'j-y' }}
                    onChange={(dates, dateStr, instance) => setValue('expiry_date', dateStr)}
                />

               <div class="form-group">
                    <button type="submit" class="btn bg-green-500 text-white p-3">Search</button>
                </div>

            </form>

            {typeof statistics === 'object' &&
            <table class="inline-block text-left">
                <tr><th>Avg Pc Per Day: </th> <td> {statistics['Avg Pc Per Day']?.toFixed(2)}</td> </tr>
                <tr><th>Avg Box Per Day: </th> <td> {statistics['Avg Box Per Day']?.toFixed(2)}</td> </tr>
                <tr><th>Avg Pc Per Week: </th> <td> {statistics['Avg Pc Per Week']?.toFixed(2)}</td> </tr>
                <tr><th>Avg Box Per Week: </th> <td> {statistics['Avg Box Per Week']?.toFixed(2)}</td> </tr>
                <tr><th>Avg Pc Per Month: </th> <td> {statistics['Avg Pc Per Month']?.toFixed(2)}</td> </tr>
                <tr><th>Avg Box Per Month: </th> <td> {statistics['Avg Box Per Month']?.toFixed(2)}</td> </tr>
            </table>}


          <div style={{ height: '70vh', width: '100%' }}>
            <DataGrid
              rows={filterBranch(rows).map((item, index) => Object.assign(item, { sno : index + 1}))}
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


export default Type8;
