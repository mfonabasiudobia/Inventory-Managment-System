import React, { useEffect, useState } from 'react'
import { yup, yupResolver, useForm, toast, axios, dateConfig, Controller, moment } from "../../../config/services";
import { useInventoryContext } from "../../../ContextApi";
import { TextField } from '@mui/material';
import Flatpickr from "react-flatpickr";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const Edit = ({ status, toggleEditModal, toggleRefresh }) => {

	const schema = yup.object().shape({
          barcode : yup.string().required(),
          description : yup.string().required(),
          expiry_date : yup.string().required(),
          quantity_pcs : yup.string().required(),
          quantity_box : yup.string().required(),
     })

     const { control, register, handleSubmit, setError, getValues, reset, formState: { errors } } = useForm({
        resolver : yupResolver(schema)
      });

     const { contextData, setContextData } = useInventoryContext();

     useEffect(() => {
     	const data = contextData.data;
     	reset({ barcode : data.barcode, description : data.description, expiry_date : data.expiry_date, quantity_pcs : data.quantity_pcs, quantity_box : data.quantity_box });

     },[status])

	const handleForm = async (data, e) => {

        setContextData({...contextData, loading : true});
        axios({
                url: "user/notifications/" + contextData.data.id,
                method: 'PUT',
                data : {...data, expiry_date : moment(data.expiry_date).toISOString()}
            })
            .then((res) => {
                 const {status, data } = res.data;

                 if(status === 'success')
                 		 toast("Notification Edited Successfully");

                 toggleEditModal();
                 toggleRefresh();
                 reset();
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
		<div class={`modal-wrapper ${!status ? 'hidden' : ''}`}>
		<section class="modal-inner-wrapper">
		        <form class="modal-body rounded-lg shadow w-full md:w-1/2 z-[1005] space-y-4 p-5 grid grid-cols-2 gap-x-5 p-5" onSubmit={handleSubmit(handleForm)}>

                <div class="form-group font-bold col-span-2">
                    <h2>Edit Notification</h2>
                </div>

                 <TextField 
                            error={errors.barcode} 
                            {...register('barcode')}
                            label="Barcode"
                            variant="outlined"
                            helperText={errors.barcode?.message}
                            type="text" 
                            fullWidth  
                        />

                <TextField 
                            error={errors.description} 
                            {...register('description')}
                            label="Description"
                            variant="outlined" 
                            helperText={errors.description?.message}
                            type="text" 
                            fullWidth  
                        />

                  <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                            label="Expiry Date"
                            onChange={onChange}
                            value={value}
                            views={["year", "month"]}
                            inputFormat="MM-yy"
                            renderInput={(params) => <TextField {...params} helperText={errors.expiry_date?.message} />}
                          />
                         </LocalizationProvider>
                        )}
                        name="expiry_date"
                      />

                 <TextField 
                            error={errors.quantity_pcs} 
                            {...register('quantity_pcs')}
                            label="Minimum Qty(Pcs)"
                            variant="outlined" 
                            helperText={errors.quantity_pcs?.message}
                            type="text" 
                            fullWidth  
                        />

                <TextField 
                            error={errors.quantity_box} 
                            {...register('quantity_box')}
                            label="Minimum Qty(Box)"
                            variant="outlined" 
                            helperText={errors.quantity_box?.message}
                            type="text" 
                            fullWidth  
                        />

                <div class="form-group flex items-center justify-end col-span-2">
                    <button type="submit" class="btn bg-green-500 hover:bg-green-600 btn-sm">SAVE</button>

                    <button type="button" class="btn text-black btn-sm" onClick={() => toggleEditModal()}>CANCEL</button>
                </div>

                </form>
		</section>

		</div>

	)
}

export default Edit;